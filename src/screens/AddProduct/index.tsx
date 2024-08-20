import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '../../providers/ThemeContext';
import { useInsert } from '../../hooks/useInsert';
import { useCategories } from '../../hooks/useCategories';

import type { ProductProps, BucketProps } from '../../@types/product'
import { HeaderScreen } from '../../components/HeaderScreen';
import { SelectInput } from '../../components/SelectInput';
import { TextInput } from '../../components/TextInput';
import { HeaderSection } from '../../components/HeaderSection';
import { SwitchInput } from '../../components/SwitchInput';
import { Button } from '../../components/Button';
import { SelectSize, mapDefaultValues, size_letter, size_numeric } from '../../components/SelectSize';

const initialValues: ProductProps = {
    title: "Teste",
    description: "",
    product_categories: "Shorts",
    type_product_sizes: "letter",
    sizes_available: {
        letter: mapDefaultValues(size_letter),
        numeric: mapDefaultValues(size_numeric),
    },
    product_available: false,
}

const productValidation = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Titulo muito curto!')
        .max(50, 'Titulo muito grande!')
        .required('Titulo é obrigatório'),
    product_categories: Yup.string()
        .required('Escolha uma categoria'),
});

export function AddProduct({ navigation }) {
    const { theme } = useTheme();
    const { dataResponse, setData } = useInsert<ProductProps & BucketProps>("products");
    const { allCategories, categoriesError } = useCategories();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);

        let checkInvalidResponse = dataResponse === undefined || dataResponse?.status != 201;
        if (checkInvalidResponse) return;

        navigation.navigate('addProductStepTwo', { productID: dataResponse.id })
    }, [dataResponse]);

    const handleSubmitProduct = async (productProps: ProductProps) => {
        setIsLoading(true);

        setData({
            title: productProps.title,
            description: productProps.description,
            product_categories: productProps.product_categories,
            sizes_available: productProps.sizes_available,
            bucket_name: 'photo',
            bucket_folder: `${productProps.product_categories}`,
            price: productProps.price,
            product_available: productProps.product_available,
            type_product_sizes: productProps.type_product_sizes,
        })
    }

    return (
        <>
            <HeaderScreen />
            <ScrollView contentContainerStyle={styles.containerScrollView}>
                <HeaderSection>
                    1º Etapa - Cadastro
                </HeaderSection>
                <View style={styles.container}>
                    <View style={{
                        position: "absolute",
                        height: 50,
                        width: "100%",
                        top: 0,
                    }} />
                    <Formik
                        initialValues={initialValues}
                        validationSchema={productValidation}
                        onSubmit={(values: ProductProps) => {
                            handleSubmitProduct(values);
                        }} >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, submitForm }) => (
                            <View style={{ padding: 20 }}>
                                <TextInput
                                    name='title'
                                    label='Titulo'
                                />
                                <TextInput
                                    name='description'
                                    label='Descrição'
                                    multiline={true}
                                    numberOfLines={5}
                                />
                                {!categoriesError && (
                                    <SelectInput
                                        name="product_categories"
                                        label="Categoria"
                                    >
                                        {allCategories?.map((item, index) => (
                                            <SelectInput.Item
                                                key={index}
                                                label={item.title}
                                                value={item.slug}
                                            />
                                        ))}
                                    </SelectInput>
                                )}
                                <TextInput
                                    name='price'
                                    label='Preço'
                                    keyboardType='number-pad'
                                />
                                <SwitchInput
                                    name="product_available"
                                    label="Produto disponível"
                                />
                                <SelectSize
                                    sizeType={values.type_product_sizes}
                                    availableSizes={values.sizes_available}
                                />
                                {/* <Button
                                    onPress={handleSubmit}
                                    text='Cadastrar'
                                    isLoading={isLoading}
                                /> */}
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </>
    );
}
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import { HeaderScreen } from '../../components/HeaderScreen';
import { useTheme } from '../../providers/ThemeContext';
import { Field, Formik } from 'formik';
import { Button } from 'react-native-paper';
import * as Yup from 'yup';
import { useInsert } from '../../hooks/useInsert';
import type { ProductProps, BucketProps } from '../../@types/product'
import { useCategories } from '../../hooks/useCategories';
import { SelectInput } from '../../components/SelectInput';
import { TextInput } from '../../components/TextInput';
import { HeaderSection } from '../../components/HeaderSection';
import { CheckboxInput } from '../../components/CheckboxInput';
import { ToggleGroup } from '../../components/ToggleGroup';
import { SwitchInput } from '../../components/SwitchInput';

type DefaultSizesValues = Array<string | number>;

const size_letter = ["P", "M", "G", "GG"];
const size_numeric = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43];

function setDefaultValues(value: DefaultSizesValues) {
    return value.reduce((prevItem, currentItem) => ({ ...prevItem, [currentItem]: false }), {});
}

const initialValues: ProductProps = {
    title: "aaaaaaa",
    description: "",
    product_categories: "Shorts",
    type_product_sizes: "letter",
    sizes_available: {
        letter: setDefaultValues(size_letter),
        numeric: setDefaultValues(size_numeric),
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

    useEffect(() => {
        console.log(dataResponse, "Passou no effect");
        if (dataResponse === undefined || dataResponse?.status != 201) return;

        navigation.navigate('addProductStepTwo', { productId: dataResponse?.id })
    }, [dataResponse]);

    const getSizesSelected = (productProps: ProductProps) => {
        const productSizeSelected = productProps.type_product_sizes == "letter"
            ? productProps.sizes_available.letter
            : productProps.sizes_available.numeric;

        return productSizeSelected;
    }

    const handleSubmitProduct = async (productProps: ProductProps) => {
        const productSizeSelected = getSizesSelected(productProps);

        setData({
            title: productProps.title,
            description: productProps.description,
            product_categories: productProps.product_categories,
            sizes_available: productSizeSelected,
            bucket_name: 'photo',
            bucket_folder: `${productProps.product_categories}/${productProps.title}`,
            price: productProps.price,
            product_available: productProps.product_available
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

                                <ToggleGroup
                                    label="Tamanhos disponíveis :"
                                    name="type_product_sizes"
                                    toggleValues={[
                                        { label: 'Letras', value: 'letter' },
                                        { label: 'Numérico', value: 'numeric' }
                                    ]}
                                    value={values.type_product_sizes}
                                />

                                <Field name="sizes_available" >
                                    {() => (
                                        <>
                                            {values.type_product_sizes === 'letter' &&
                                                Object.keys(values.sizes_available.letter).map((inputName, key, obj) => {
                                                    const currentInputValue = values.sizes_available.letter[inputName]

                                                    return (
                                                        <CheckboxInput
                                                            key={key}
                                                            name={`sizes_available.letter.${inputName}`}
                                                            value={currentInputValue}
                                                            label={inputName}
                                                        />
                                                    )
                                                })}

                                            {values.type_product_sizes === 'numeric' &&
                                                Object.keys(values.sizes_available.numeric).map((inputName, key, obj) => {
                                                    const currentInputValue = values.sizes_available.numeric[inputName]

                                                    return (
                                                        <CheckboxInput
                                                            key={key}
                                                            name={`sizes_available.numeric.${inputName}`}
                                                            value={currentInputValue}
                                                            label={inputName}
                                                        />
                                                    )
                                                })}
                                        </>
                                    )}
                                </Field>

                                <SwitchInput
                                    name="product_available"
                                    label="Produto disponível"
                                />

                                <Button
                                    onPress={handleSubmit as () => void}
                                    mode="contained"
                                    style={styles.submitButton}
                                >
                                    Cadastrar
                                </Button>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </>
    );
}







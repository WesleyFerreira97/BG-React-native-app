import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

import { HeaderScreen } from '../../components/HeaderScreen';
import { useTheme } from '../../providers/ThemeContext';
import { Formik } from 'formik';
import { Button } from 'react-native-paper';
import * as Yup from 'yup';
import { useInsert } from '../../hooks/useInsert';
import type { ProductProps } from '../../@types/product'
import { useCategories } from '../../hooks/useCategories';
import { SelectInput } from '../../components/SelectInput';
import { TextInput } from '../../components/TextInput';
import { HeaderSection } from '../../components/HeaderSection';
import { Modal } from '../../components/Modal';
import { CheckboxInput } from '../../components/CheckboxInput';

const initialValues: ProductProps = {
    title: "",
    description: "",
    product_categories: "",
    bucket: "",
    bucket_folder: "",
    price: 0,
}

const productValidation = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Titulo muito curto!')
        .max(50, 'Titulo muito grande!')
        .required('Titulo é obrigatório'),
});

export function AddProduct() {
    const { theme } = useTheme();
    const { dataResponse, setData } = useInsert<ProductProps>("products");
    const [productProps, setProductProps] = useState<any>();
    const { allCategories, categoriesError } = useCategories();

    useEffect(() => {
        if (!productProps) return;

        const handleSubmitProduct = async () => {

            setData({
                title: productProps.title,
                description: productProps.description,
                product_categories: productProps.product_categories,
                bucket: 'photo',
                bucket_folder: `products/${productProps.product_categories}/${productProps.title}`,
                price: productProps.price,
            })
        }

        handleSubmitProduct();
    }, [productProps]);

    const product_sizes: { [key: string]: string } = {
        sizeP: 'Tamanho P',
        sizeM: 'Tamanho M',
        sizeG: 'Tamanho G',
        sizeGG: 'Tamanho GG',
    }

    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme.colors.neutralAlt,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <HeaderScreen />

            <Formik
                initialValues={initialValues}
                validationSchema={productValidation}
                onSubmit={(values: ProductProps) => {
                    // setProductProps(values);
                    console.log(values, 'values submit log');
                }} >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, submitForm }) => (

                    <View style={{ flex: 1, width: '90%' }}>

                        <HeaderSection>
                            1º Etapa - Cadastro
                        </HeaderSection>

                        <TextInput
                            name='title'
                            label='Title'
                            placeholder='Titulo do produto'
                        />

                        <TextInput
                            name='description'
                            label='Descrição'
                            placeholder='Descrição do produto'
                            multiline={true}
                            numberOfLines={5}
                        />

                        {errors.title && touched.title ? (
                            <Text style={{ color: 'red' }}>{errors.title}</Text>
                        ) : null}

                        {!categoriesError && (
                            <SelectInput name="product_categories" >
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
                            label='Price'
                            placeholder='Preço'
                            keyboardType='number-pad'
                        />

                        <Modal
                            modalLabel='Tamanhos : '
                            value={'default value'}
                        >
                            {Object.keys(product_sizes).map((value, key) => (
                                <CheckboxInput
                                    key={key}
                                    name={value}
                                    label={product_sizes[value]}
                                />
                            ))}
                        </Modal>


                        <Button onPress={handleSubmit} mode="contained"> Submit </Button>

                    </View>
                )}
            </Formik>
        </View>
    );
}


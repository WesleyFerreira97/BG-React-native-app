import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from './styles';

import { HeaderScreen } from '../../components/HeaderScreen';
import { useTheme } from '../../providers/ThemeContext';
import { Field, FieldArray, Formik } from 'formik';
import { Button } from 'react-native-paper';
import * as Yup from 'yup';
import { useInsert } from '../../hooks/useInsert';
import type { ProductProps, BucketProps } from '../../@types/product'
import { useCategories } from '../../hooks/useCategories';
import { SelectInput } from '../../components/SelectInput';
import { TextInput } from '../../components/TextInput';
import { HeaderSection } from '../../components/HeaderSection';
import { Modal } from '../../components/Modal';
import { CheckboxInput } from '../../components/CheckboxInput';
import { ToggleGroup } from '../../components/ToggleGroup';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

type DefaultSizesValues = Array<string | number>;

const size_letter = ["P", "M", "G", "GG"];
const size_numeric = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43];

function setDefaultValues(value: DefaultSizesValues) {
    return value.reduce((prevItem, currentItem) => ({ ...prevItem, [currentItem]: false }), {});
}

const initialValues: ProductProps = {
    title: "",
    description: "",
    product_categories: "",
    type_product_sizes: "letter",
    sizes_available: {
        letter: setDefaultValues(size_letter),
        numeric: setDefaultValues(size_numeric),
    },
    price: 0,
}

const productValidation = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Titulo muito curto!')
        .max(50, 'Titulo muito grande!')
        .required('Titulo é obrigatório'),
    product_categories: Yup.string()
        .required('Escolha uma categoria'),
    price: Yup.string()
        .min(2, 'Preço inválido')
        .max(10, 'Preço inválido!')
        .required('Preço é obrigatório'),
});

export function AddProduct({ navigation }) {
    const { theme } = useTheme();
    const { dataResponse, setData } = useInsert<ProductProps & BucketProps>("products");
    const { allCategories, categoriesError } = useCategories();

    useEffect(() => {
        if (dataResponse?.error) return
        // Go to next register product step
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
        })
    }

    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme.colors.neutralAlt,
            flex: 1,

        }}>
            <HeaderScreen />

            <Formik
                initialValues={initialValues}
                validationSchema={productValidation}
                onSubmit={(values: ProductProps) => {
                    handleSubmitProduct(values);
                    // setProductProps(values);
                }} >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, submitForm }) => (
                    <View style={{
                        // width: '100%',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                        <ScrollView style={{ flex: 1, width: '90%' }}>
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
                        </ScrollView>

                        <Button
                            onPress={handleSubmit}
                            mode="contained"
                            style={styles.submitButton}
                        >
                            Cadastrar
                        </Button>
                    </View>
                )
                }
            </Formik >
        </View >
    );
}
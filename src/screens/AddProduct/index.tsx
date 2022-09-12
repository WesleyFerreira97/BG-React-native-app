import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

import { HeaderScreen } from '../../components/HeaderScreen';
import { useTheme } from '../../providers/ThemeContext';
import { Formik } from 'formik';
import { Button, TextInput } from 'react-native-paper';
import * as Yup from 'yup';
import { useInsert } from '../../hooks/useInsert';
import type { ProductProps } from '../../@types/product'
import { ImageInput } from '../../components/ImageInput';
import { useFileUploadAlt } from '../../hooks/useFileUpload';
import { Picker } from '@react-native-picker/picker';
import { useCategories } from '../../hooks/useCategories';
import { SelectInput } from '../../components/SelectInput';
import { CheckboxInput } from '../../components/CheckboxInput';

const initialValues: ProductProps = {
    title: "",
    description: "",
    product_categories: "",
    bucket: "",
    bucket_folder: "",
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
            // backgroundColor: theme.colors.neutralAlt,
            backgroundColor: "navy",
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {/* <HeaderScreen /> */}
            <Formik
                initialValues={initialValues}
                validationSchema={productValidation}
                onSubmit={(values: ProductProps) => {
                    // setProductProps(values);
                    console.log(values, 'values submit log');

                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, submitForm }) => (
                    <View style={{ flex: 1, width: '90%' }}>
                        <TextInput
                            onChangeText={handleChange('title')}
                            onBlur={handleBlur('title')}
                            value={values.title}
                            placeholder="Titulo"
                            mode='outlined'
                        />
                        <TextInput
                            onChangeText={handleChange('description')}
                            onBlur={handleBlur('description')}
                            value={values.description}
                            placeholder="Descrição"
                            mode='outlined'
                        />

                        {errors.title && touched.title ? (
                            <Text style={{ color: 'red' }}>{errors.title}</Text>
                        ) : null}

                        {!categoriesError && (
                            <SelectInput
                                name="product_categories"
                                style={{ color: theme.colors.neutral }}
                            >
                                {allCategories?.map((item, index) => (
                                    <SelectInput.Item
                                        key={index}
                                        label={item.title}
                                        value={item.slug}
                                        style={{ color: theme.colors.secondary }}
                                    />
                                ))}
                            </SelectInput>
                        )}

                        {Object.keys(product_sizes).map((value, key) => (
                            <CheckboxInput
                                key={key}
                                name={value}
                                label={product_sizes[value]}
                            />
                        ))}
                        <Button onPress={handleSubmit}> Submit </Button>
                    </View>
                )}
            </Formik>
        </View>
    );
}


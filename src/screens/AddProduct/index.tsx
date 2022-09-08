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
    const { categoriesData } = useCategories();

    useEffect(() => {
        if (!productProps) return;

        const handleSubmitProduct = async () => {

            // const { uploadFileData, uploadFileError } = await useFileUploadAlt({
            //     name: productProps.title,
            //     data: productProps.image
            // });

            // if (uploadFileError) return;

            // console.log(uploadFileData, 'buckets uploadFileData');

            setData({
                title: productProps.title,
                product_categories: 'shorts',
                bucket: 'photo',
                bucket_folder: `products/${productProps.title}`,
            })
        }

        handleSubmitProduct();
    }, [productProps])

    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme.colors.secondary,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <HeaderScreen />
            <Formik
                initialValues={initialValues}
                validationSchema={productValidation}
                onSubmit={(values: ProductProps) => {
                    setProductProps(values);
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

                        {errors.title && touched.title ? (
                            <Text style={{ color: 'red' }}>{errors.title}</Text>
                        ) : null}

                        <Picker

                        >

                        </Picker>
                        {/* <ImageInput
                            name="image"
                        /> */}

                        <Button onPress={handleSubmit}> Submit </Button>
                    </View>
                )}
            </Formik>
        </View>
    );
}

// Fluxo do submit
// Cadastrar os produtos 
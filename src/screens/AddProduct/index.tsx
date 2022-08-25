import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { styles } from './styles';

import { HeaderScreen } from '../../components/HeaderScreen';
import { useTheme } from '../../providers/ThemeContext';
import { Formik } from 'formik';
import { Button, TextInput } from 'react-native-paper';
import * as Yup from 'yup';
import { useInsert } from '../../hooks/useInsert';
import { supaDb } from '../../services/supadb';
import type { ProductProps } from '../../@types/product'
import { ImageInput } from '../../components/ImageInput';
import { useFileUpload } from '../../hooks/useFileUpload';


const initialValues: ProductProps = {
    title: "",
    description: "",
    image: "",
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
    const { setFile } = useFileUpload();

    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme.colors.secondary
        }}>
            <HeaderScreen />
            <Formik
                initialValues={initialValues}
                validationSchema={productValidation}
                onSubmit={(values: ProductProps) => {
                    console.log(values.image);

                    // setFile({
                    //     name: "fodase",
                    //     data: values.image
                    // })
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{ flex: 1 }}>
                        <TextInput
                            onChangeText={handleChange('title')}
                            onBlur={handleBlur('title')}
                            value={values.title}
                            placeholder="Titulo"
                        />

                        {errors.title && touched.title ? (
                            <Text style={{ color: 'red' }}>{errors.title}</Text>
                        ) : null}

                        <ImageInput
                            name="image"
                        />

                        <Button onPress={handleSubmit}> Submit </Button>
                    </View>
                )}
            </Formik>



        </View>
    );
}
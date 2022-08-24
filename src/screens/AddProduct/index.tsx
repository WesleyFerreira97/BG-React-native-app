import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
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
    image: Yup.string()
        .min(10, 'Imagem inválida')
        .required('Imagem é obrigatória'),

});

export function AddProduct() {
    const { theme } = useTheme();
    const { dataResponse, setData } = useInsert<ProductProps>("products");

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
                    console.log(values);
                    // setData() 
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
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
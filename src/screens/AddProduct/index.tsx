import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './styles';

import { HeaderScreen } from '../../components/HeaderScreen';
import { useTheme } from '../../providers/ThemeContext';
import { Formik } from 'formik';
import { Button, TextInput } from 'react-native-paper';
import * as Yup from 'yup';
import { dbInsert } from '../../hooks/dbInsert';
import { supaDb } from '../../services/supadb';
import type { ProductProps } from '../../@types/product'
import * as ImagePicker from 'expo-image-picker';

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
    const { dataResponse, setData } = dbInsert<ProductProps>("products");
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImageSrc(result.uri);
        }
    };


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
                        <Button onPress={handleSubmit}> Submit </Button>
                    </View>
                )}
            </Formik>

            <Button onPress={pickImage}>Image Picker</Button>
            {imageSrc && (
                <Image
                    source={{ uri: imageSrc }}
                    style={{ width: '90%', height: '40%' }}
                />
            )}

        </View>
    );
}
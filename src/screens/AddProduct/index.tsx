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

const initialValues: ProductProps = {
    title: "",
    description: "",
    images: "",
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

    useEffect(() => {
        if (!productProps) return;

        const handleSubmitProduct = async () => {

            const { uploadFileData, uploadFileError } = await useFileUploadAlt({
                name: productProps.title,
                data: productProps.image
            });


            if (uploadFileError) return;

            // setData({
            //     title: productProps.title,
            //     images: 'values.description',
            // })
        }

        handleSubmitProduct();
    }, [productProps])

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
                    setProductProps(values);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, submitForm }) => (
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

// Fluxo do submit
// Inserir bucket de imagem
// Aguardar a resposta do servidor
// Dependendo da resposta inserir a table com os dados relacionados a imagem/bucket
// Ou mostrar mensagem de erro 

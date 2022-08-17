import React from 'react';
import { Text, View } from 'react-native';
import { HeaderScreen } from '../../components/HeaderScreen';
import { useTheme } from '../../hooks/ThemeContext';
import { Formik } from 'formik';

import { styles } from './styles';
import { Button, TextInput } from 'react-native-paper';
import * as Yup from 'yup';

type FormValueProps = {
    title: string,
    description: string,
}

const initialValues: FormValueProps = {
    title: "",
    description: "",
}

const productValidation = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Titulo muito curto!')
        .max(50, 'Titulo muito grande!')
        .required('Titulo é obrigatório'),

});

export function AddProduct() {
    const { theme } = useTheme();

    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme.colors.secondary
        }}>
            <HeaderScreen />
            <Formik
                initialValues={initialValues}
                validationSchema={productValidation}
                onSubmit={(values: FormValueProps) => {
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
        </View>
    );
}
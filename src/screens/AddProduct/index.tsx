import React from 'react';
import { View } from 'react-native';
import { HeaderScreen } from '../../components/HeaderScreen';
import { useTheme } from '../../hooks/ThemeContext';
import { Formik } from 'formik';

import { styles } from './styles';
import { Button, TextInput } from 'react-native-paper';

type FormValueProps = {
    title: string,
    description: string,
}

const initialValues: FormValueProps = {
    title: "",
    description: "",
}

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
                onSubmit={(values: FormValueProps) => {
                    console.log(values);

                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <TextInput
                            onChangeText={handleChange('title')}
                            onBlur={handleBlur('title')}
                            value={values.title}
                            placeholder="Titulo"
                        />
                        <Button onPress={handleSubmit}> Submit </Button>
                    </View>
                )}
            </Formik>
        </View>
    );
}
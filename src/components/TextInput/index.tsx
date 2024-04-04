import React, { useEffect, useState } from 'react';
import { Text, View, KeyboardTypeOptions } from 'react-native';
import { useField } from 'formik';
import { styles } from './styles';
import { Button, TextInput as TextInputPaper } from 'react-native-paper';
import { theme } from '../../styles/theme';
import { ErrorForm } from '../ErrorForm';

type TextInputProps = {
    name: string;
    label: string;
    placeholder?: string;
    multiline?: boolean;
    numberOfLines?: number;
    keyboardType?: KeyboardTypeOptions;
    value?: string | number;
}

export function TextInput({ name, value, ...props }: TextInputProps) {
    const [field, meta, helpers] = useField(name);

    useEffect(() => {
        const isValidValue = value !== undefined && value !== field.value;

        if (isValidValue) {
            helpers.setValue(value);
        }

    }, [value])

    const handleOnChange = (e: string) => {
        helpers.setValue(e);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInputPaper
                keyboardType={props.keyboardType}
                onChangeText={(e) => handleOnChange(e)}
                value={field.value}
                mode='flat'
                placeholder={props.placeholder}
                outlineColor='yellow'
                placeholderTextColor={theme.colors.darkGray}
                underlineStyle={{
                    borderWidth: 1,
                    borderColor: theme.colors.darkGray
                }}
                multiline={props.multiline}
                numberOfLines={props.numberOfLines}
                theme={{
                    colors: {
                        background: "#fff",
                    },
                }}
            />

            <ErrorForm meta={meta} />
        </View>
    );
}

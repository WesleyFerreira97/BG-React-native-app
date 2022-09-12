import React, { useState } from 'react';
import { View } from 'react-native';
import { useField } from 'formik';
import { styles } from './styles';
import { Button, TextInput as TextInputPaper } from 'react-native-paper';

type TextInputProps = {
    name: string;
    label: string;
    placeholder?: string;
}

export function TextInput({ name, ...props }: TextInputProps) {
    const [field, meta, helpers] = useField(name);
    const [textValue, setTextValue] = useState();

    const handleOnChange = (e: string) => {
        helpers.setValue(e);
    }

    return (
        <View style={styles.container}>
            <TextInputPaper
                onChangeText={(e) => handleOnChange(e)}
                value={textValue}
                mode='outlined'
                placeholder={props.placeholder}
            />
        </View>
    );
}

import React, { useState } from 'react';
import { View } from 'react-native';
import { useField } from 'formik';
import { styles } from './styles';
import { Button, TextInput as TextInputPaper } from 'react-native-paper';
import { theme } from '../../styles/theme';

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
                theme={{
                    roundness: 7,
                    colors: {
                        primary: '#E2E1E5',
                        background: "#fff",
                        placeholder: '#A8A8A8'
                    },
                }}
            />
        </View>
    );
}

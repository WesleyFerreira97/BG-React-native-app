import React, { useState } from 'react';
import { Text, View, KeyboardTypeOptions } from 'react-native';
import { useField } from 'formik';
import { styles } from './styles';
import { Button, TextInput as TextInputPaper } from 'react-native-paper';
import { theme } from '../../styles/theme';

type TextInputProps = {
    name: string;
    label: string;
    placeholder?: string;
    multiline?: boolean;
    numberOfLines?: number;
    keyboardType?: KeyboardTypeOptions;
}

export function TextInput({ name, ...props }: TextInputProps) {
    const [field, meta, helpers] = useField(name);
    const [textValue, setTextValue] = useState();

    const handleOnChange = (e: string) => {
        helpers.setValue(e);
    }

    return (
        <View style={styles.container}>
            {/* <Text style={styles.label}>{props.label}</Text> */}
            <TextInputPaper
                keyboardType={props.keyboardType}
                onChangeText={(e) => handleOnChange(e)}
                value={textValue}
                mode='outlined'
                placeholder={props.placeholder}
                underlineColor='red'
                activeOutlineColor='#A8A8A8'
                outlineColor='#E2E1E5'
                multiline={props.multiline}
                numberOfLines={props.numberOfLines}
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

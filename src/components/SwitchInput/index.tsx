import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { Switch } from 'react-native-paper';
import { useField } from 'formik';

type SwitchInputProps = {
    name: string;
    label: string;
    value?: boolean | number;
}

export function SwitchInput({ value, ...props }: SwitchInputProps) {
    const [field, meta, helpers] = useField(props.name);

    useEffect(() => {
        const isValidValue = value !== undefined && !field.value;

        if (isValidValue) {
            helpers.setValue(value);
        }
    }, [])

    const handleSwitchToggle = (value: boolean) => {
        helpers.setValue(value);
    }

    return (
        <View style={styles.container}>
            <Switch value={field.value} onValueChange={handleSwitchToggle} />
            <Text style={styles.label}>
                {props.label}
            </Text>
        </View>
    );
}
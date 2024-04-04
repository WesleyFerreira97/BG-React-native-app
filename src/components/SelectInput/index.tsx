import React, { useEffect, useState, PropsWithChildren } from 'react';
import { View, StyleProp, TextStyle, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useField } from 'formik';
import { styles } from './styles';
import { ErrorForm } from '../ErrorForm';

type SelectInputProps = {
    name: string;
    style?: StyleProp<TextStyle>;
    label: string;
    value?: string | number;
}

type SelectItemProps = {
    label: string;
    value: string;
    style?: StyleProp<TextStyle>;
}

const Item = ({ label, value, style }: SelectItemProps) => {
    return (
        <Picker.Item
            label={label}
            value={value}
            style={style}
        />
    )
}

function SelectInput({ name, children, style, value, ...props }: PropsWithChildren<SelectInputProps>) {
    const [field, meta, helpers] = useField(name);

    useEffect(() => {
        const isValidValue = value !== undefined && !field.value;
        console.log(field.value, "field.value");

        if (isValidValue) {
            helpers.setValue(value);
        }

    }, [value])

    const handleSelect = (selectedItem: string) => {
        helpers.setValue(selectedItem);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {props.label}
            </Text>
            <Picker
                style={styles.selectedLabel}
                selectedValue={field.value}
                onValueChange={(itemValue, itemIndex) =>
                    handleSelect(itemValue)
                }>
                {children}
            </Picker>

            <ErrorForm meta={meta} />
        </View>
    );
}

SelectInput.Item = Item;

export { SelectInput }
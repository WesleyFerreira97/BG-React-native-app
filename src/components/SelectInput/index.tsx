import React, { useEffect, useState, PropsWithChildren } from 'react';
import { View, StyleProp, TextStyle, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useField } from 'formik';
import { styles } from './styles';
import { ErrorForm } from '../ErrorForm';

type SelectInputProps = {
    name: string;
    style?: StyleProp<TextStyle>
    label: string,
}

type SelectItemProps = {
    label: string,
    value: string,
    style?: StyleProp<TextStyle>
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

function SelectInput({ name, children, style, ...props }: PropsWithChildren<SelectInputProps>) {
    const [field, meta, helpers] = useField(name);
    const [selectedValue, setSelectValue] = useState<string>();

    const handleSelect = (selectedItem: string) => {
        setSelectValue(selectedItem);
        helpers.setValue(selectedItem);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {props.label}
            </Text>
            <Picker
                style={styles.selectedLabel}
                selectedValue={selectedValue}
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
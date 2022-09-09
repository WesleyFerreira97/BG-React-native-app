import React, { useEffect, useState, PropsWithChildren } from 'react';
import { View, StyleProp, TextStyle } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useField } from 'formik';
import { styles } from './styles';

type SelectInputProps = {
    name: string;
    style?: StyleProp<TextStyle>
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

function SelectInput({ name, children, style }: PropsWithChildren<SelectInputProps>) {
    const [field, meta, helpers] = useField(name);
    const [selectedValue, setSelectValue] = useState();

    useEffect(() => {
        console.log(selectedValue, 'selected value');

        helpers.setValue(selectedValue)
    }, [selectedValue])

    return (
        <View style={styles.container}>

            <Picker
                style={style}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectValue(itemValue)
                }>

                {children}

            </Picker>
        </View>
    );
}

SelectInput.Item = Item;

export { SelectInput }
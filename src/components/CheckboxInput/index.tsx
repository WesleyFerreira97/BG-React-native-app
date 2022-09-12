import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';

import { styles } from './styles';

type CheckboxProps = {
    name: string;
    label: string
}

export function CheckboxInput({ name, ...props }: CheckboxProps) {
    const [field, meta, helpers] = useField(name);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        helpers.setValue(checked);
    }, [checked])

    return (
        <View style={styles.container}>
            <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                    setChecked(!checked);
                }}
            />
            <Text style={styles.label}>
                {props.label}
            </Text>
        </View>
    );
}
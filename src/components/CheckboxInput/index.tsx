import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { ErrorForm } from '../ErrorForm';

import { styles } from './styles';

type CheckboxProps = {
    name: string;
    label: string | number;
    value?: number | boolean;
}

export function CheckboxInput({ name, ...props }: CheckboxProps) {
    const [field, meta, helpers] = useField(name);
    const [checked, setChecked] = useState<number | boolean>(false);

    useEffect(() => {
        if (props.value) setChecked(props.value);

    }, [])

    const handleOnChecked = (value: number | boolean) => {
        setChecked(value);
        helpers.setValue(value);
    }

    return (
        <View style={styles.container}>
            <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                    handleOnChecked(!checked);
                }}
            />
            <Text style={styles.label}>
                {props.label}
            </Text>

            <ErrorForm meta={meta} />
        </View>
    );
}

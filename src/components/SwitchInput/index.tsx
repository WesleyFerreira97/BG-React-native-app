import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { Switch } from 'react-native-paper';
import { useField } from 'formik';
type SwitchInputProps = {
    name: string;
    label: string;
}

export function SwitchInput(props: SwitchInputProps) {
    const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
    const [field, meta, helpers] = useField(props.name);

    const handleSwitchToggle = (value: boolean) => {
        setIsSwitchOn(value);
        helpers.setValue(value);
    }

    return (
        <View style={styles.container}>
            <Switch value={isSwitchOn} onValueChange={handleSwitchToggle} />
            <Text style={styles.label}>
                {props.label}
            </Text>
        </View>
    );
}
import { useField } from 'formik';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button, ToggleButton } from 'react-native-paper';
import { ErrorForm } from '../ErrorForm';
import { styles } from './styles';

type ItemProps = {
    label: string;
    value: string;
}

type ToggleGroupTypes = {
    label: string;
    name: string;
    toggleValues: ItemProps[];
    value?: string;
}

export function ToggleGroup({ name, toggleValues, value, ...props }: ToggleGroupTypes) {
    const [field, meta, helpers] = useField(name);
    const [currentValue, setCurrentValue] = React.useState<string | null>(null);

    useEffect(() => {
        // Set initial value
        if (value) setCurrentValue(value)

    }, [])

    const handleToggle = (value: string) => {
        setCurrentValue(value)
        helpers.setValue(value)
    }

    return (
        <View style={styles.container}>

            <Text style={styles.componentLabel}>
                {props.label}
            </Text>

            <View style={styles.itemsContainer}>
                {toggleValues &&
                    toggleValues.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleToggle(item.value)}
                        >
                            <View
                                style={[currentValue === item.value
                                    ? styles.itemButton
                                    : {}
                                ]}>

                                <Text
                                    style={[currentValue === item.value
                                        ? styles.itemLabelActive
                                        : styles.itemLabelInactive
                                    ]}>
                                    {item.label}
                                </Text>

                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>

            <ErrorForm meta={meta} />
        </View>
    );
}

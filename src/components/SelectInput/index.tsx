import { Picker } from '@react-native-picker/picker';
import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { styles } from './styles';

export function SelectInput({ label, ...props }: any) {
    const [field, meta, helpers] = useField(props);
    const [selectedValue, setSelectValue] = useState();

    useEffect(() => {
        helpers.setValue(selectedValue)
    }, [selectedValue])

    return (
        <View style={styles.container}>
            <Picker
                style={{ color: 'green' }}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectValue(itemValue)
                }>

                <Picker.Item
                    label='Selecione uma categoria'
                />

                {props.items?.map((data: any) => (
                    <Picker.Item
                        key={data.id}
                        label={data.title}
                        value={data.slug}
                    />
                ))}
            </Picker>
        </View>
    );
}
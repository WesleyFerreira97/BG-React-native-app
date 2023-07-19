import React from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { styles } from './styles';

type SearchProps = {
    label: string;
    value: string;
    handleChange: (value: string) => void;
}

export function SearchInput(props: SearchProps) {
    return (
        <View style={styles.container}>
            <TextInput
                label="Search"
                value={props.value}
                onChangeText={(e) => {
                    props.handleChange(e);
                }}
            />
        </View>
    );
}
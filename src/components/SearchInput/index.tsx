import React from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { styles } from './styles';
import { useTheme } from '../../providers/ThemeContext';

type SearchProps = {
    label: string;
    value: string;
    handleChange: (value: string) => void;
}

export function SearchInput(props: SearchProps) {
    const { theme } = useTheme();
    const { label, value, handleChange } = props;

    return (
        <View style={styles.container}>
            <TextInput
                label={label}
                value={value}
                underlineColor='transparent'
                mode='flat'
                style={{
                    backgroundColor: theme.colors.primaryAlt,
                    borderBottomColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 8,
                    overflow: "hidden",
                }}
                textColor={theme.colors.neutral}
                onChangeText={(e) => {
                    handleChange(e);
                }}
            />
        </View>
    );
}
import { PlusCircle } from 'phosphor-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../hooks/ThemeContext';

import { styles } from './styles';

export function HeaderScreen() {
    const { theme } = useTheme();

    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme.colors.secondary
        }}>
            <PlusCircle color={theme.colors.neutralAlt} weight="regular" size={24} />
            <Text
                style={{
                    ...styles.title,
                    color: theme.colors.neutralAlt
                }}>

                Adicionar Produto
            </Text>
        </View>
    );
}
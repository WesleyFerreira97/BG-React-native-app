import { PlusCircle } from 'phosphor-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../providers/ThemeContext';

import { styles } from './styles';

export function HeaderScreen() {
    const { theme } = useTheme();

    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme.colors.secondaryAlt
        }}>
            <PlusCircle color={theme.colors.neutralAlt} weight="regular" size={28} />
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
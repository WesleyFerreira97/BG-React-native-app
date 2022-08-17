import React from 'react';
import { View } from 'react-native';
import { HeaderScreen } from '../../components/HeaderScreen';
import { useTheme } from '../../hooks/ThemeContext';

import { styles } from './styles';

export function AddProduct() {
    const { theme } = useTheme();

    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme.colors.neutralAlt
        }}>
            <HeaderScreen />
        </View>
    );
}
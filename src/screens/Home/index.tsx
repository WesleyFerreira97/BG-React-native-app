import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useTheme } from '../../providers/ThemeContext';
import { ThemeProps } from '../../providers/ThemeContext';
import { supaDb } from '../../services/supadb';
import { styles } from './styles';
import React, { PropsWithChildren } from 'react';

export function HomeScreen() {
    const { theme, setTheme } = useTheme();
    console.log(theme);

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.neutralAlt }
            ]} >
            <Text>fsdfgfhgdfhde</Text>
        </View>
    );
}





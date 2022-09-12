import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

type HeaderSectionProps = {
    children: React.ReactNode | null,
}

export function HeaderSection({ children }: HeaderSectionProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{children}</Text>
        </View>
    );
}
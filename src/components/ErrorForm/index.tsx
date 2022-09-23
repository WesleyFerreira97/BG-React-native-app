import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

export function ErrorForm({ meta }: any) {
    return (
        <>
            {meta.error && meta.touched ? (
                <Text style={styles.label}>{meta.error}</Text>
            ) : null}
        </>
    );
}

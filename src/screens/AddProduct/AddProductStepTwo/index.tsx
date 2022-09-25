import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

export function AddProductStepTwo(props) {
    console.log(props);

    return (
        <View style={styles.container}>
            <Text>Step Two</Text>
        </View>
    );
}
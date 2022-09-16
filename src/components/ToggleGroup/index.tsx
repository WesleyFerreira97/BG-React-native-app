import React from 'react';
import { View } from 'react-native';
import { ToggleButton } from 'react-native-paper';
import { styles } from './styles';

export function ToggleGroup() {
    const [value, setValue] = React.useState('');

    return (
        <View style={styles.container}>
            <ToggleButton.Row
                onValueChange={value => setValue(value)}
                value={value}
            >
                <ToggleButton icon="format-align-left" value="left" />
                <ToggleButton icon="format-align-right" value="right" />
            </ToggleButton.Row>
        </View>
    );
}
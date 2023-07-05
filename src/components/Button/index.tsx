import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableRipple } from 'react-native-paper';

type ButtonProps = {
    text: string;
    onPress?: () => void;
}

export function Button({ text, ...props }: ButtonProps) {

    const handleOnPress = () => {
        if (props.onPress === undefined) return;

        props.onPress()
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => handleOnPress()}
        >
            <Text>{text}</Text>
        </TouchableOpacity>
    );
}
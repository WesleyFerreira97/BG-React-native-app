import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableRipple } from 'react-native-paper';
import { theme } from '../../styles/theme';

type ButtonProps = {
    text: string;
    onPress?: () => void;
    bgColor?: string;
}

export function Button({ text, ...props }: ButtonProps) {

    const handleOnPress = () => {
        if (props.onPress === undefined) return;

        props.onPress()
    }

    return (
        <TouchableOpacity
            style={{
                ...styles.container,
                backgroundColor: props.bgColor
                    ? props.bgColor
                    : theme.colors.secondary
            }}
            onPress={() => handleOnPress()}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}
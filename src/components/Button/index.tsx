import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator, TouchableRipple } from 'react-native-paper';
import { theme } from '../../styles/theme';

type ButtonProps = {
    text: string;
    onPress?: () => void;
    bgColor?: string;
    isLoading?: boolean;
}

export function Button({ text, isLoading = false, ...props }: ButtonProps) {
    const disabled = false;

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
                    : theme.colors.secondaryAlt
            }}
            onPress={disabled ? null : handleOnPress}
        >
            <ActivityIndicator
                animating={isLoading}
                style={styles.spinner}
                color={theme.colors.primary}
            />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}
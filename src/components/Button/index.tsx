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

    const handleOnPress = () => {
        if (props.onPress === undefined) return;

        props.onPress()
    }

    let buttonColor = props.bgColor || theme.colors.secondaryAlt;
    let isDisabled = isLoading ? true : false;

    return (
        <TouchableOpacity
            style={{
                ...styles.container,
                backgroundColor: buttonColor,
                marginTop: 30
            }}
            onPress={handleOnPress}
        // disabled={isDisabled}
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
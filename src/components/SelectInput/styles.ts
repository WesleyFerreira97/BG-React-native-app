import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.neutral,
        borderRadius: 7,
        borderColor: theme.colors.neutralAlt,
        borderWidth: 2,
        paddingHorizontal: 5,
    },
    selectedLabel: {
        color: theme.colors.darkGray,
        fontFamily: theme.fonts.secondary,
    }
});
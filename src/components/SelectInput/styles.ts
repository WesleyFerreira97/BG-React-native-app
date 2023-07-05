import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        borderColor: theme.colors.neutralAlt,
        borderWidth: 2,
        marginVertical: 8,
    },
    selectedLabel: {
        color: theme.colors.darkGray,
        fontFamily: theme.fonts.secondary,
        backgroundColor: theme.colors.neutral,
    },
    label: {
        fontFamily: theme.fonts.secondary,
        fontSize: 15,
        color: theme.colors.darkGray,
        fontWeight: '700',
        marginVertical: 8,
    }
});
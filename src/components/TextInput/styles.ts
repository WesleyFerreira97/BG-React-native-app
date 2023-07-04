import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
        paddingBottom: 8,
    },
    label: {
        fontFamily: theme.fonts.secondary,
        fontSize: 15,
        color: theme.colors.primaryAlt,
        fontWeight: '700',
        marginVertical: 8,
    }
});
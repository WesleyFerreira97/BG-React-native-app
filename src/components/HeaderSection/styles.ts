import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        minHeight: 60,
        width: '100%',
        backgroundColor: theme.colors.secondaryAlt,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 16,
        fontWeight: '200',
        fontFamily: theme.fonts.secondary,
        color: theme.colors.neutral,
        // paddingLeft: 20,
    }
});
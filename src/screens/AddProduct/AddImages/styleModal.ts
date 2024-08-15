import { StyleSheet } from 'react-native';
import { theme } from '../../../styles/theme';

export const styles = StyleSheet.create({
    modalContentWrap: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalInnerContent: {
        flexDirection: 'row',
        gap: 5,
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center"
    },
    modalTitle: {
        fontFamily: theme.fonts.secondary,
        fontSize: 18,
        marginBottom: 20,
    },
    menuItem: {
        height: 56,
        width: '100%',
        minWidth: 80,
        backgroundColor: theme.colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 3,
    },
    menuItemTitle: {
        color: theme.colors.neutral,
    }
});
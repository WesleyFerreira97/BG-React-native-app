import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primaryAlt,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        width: "100%",
        backgroundColor: theme.colors.primary,
    },
    homeTitle: {
        color: theme.colors.neutral,
        fontSize: 24,
        fontFamily: theme.fonts.secondaryAlt
    },
    homeSubtitle: {
        color: theme.colors.neutral,
        fontSize: 18,
        fontFamily: theme.fonts.secondary
    },
    button: {
        color: '#fff',
        backgroundColor: theme.colors.primaryAlt,
    }
});

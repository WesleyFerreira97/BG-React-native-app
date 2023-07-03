import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        // backgroundColor: theme.colors.primary,
        flex: 1,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        width: "100%",
    },
    button: {
        color: '#fff',
        backgroundColor: theme.colors.primaryAlt,
    }
});

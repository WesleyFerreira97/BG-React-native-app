import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.neutral,
        position: 'relative',
    },
    containerScrollView: {
        flexGrow: 1,
        paddingBottom: 50,
    },
    submitButton: {
        width: '90%',
        marginVertical: 20,
        backgroundColor: theme.colors.primaryAlt,
    },
});
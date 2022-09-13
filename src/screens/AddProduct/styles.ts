import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    submitButton: {
        width: '90%',
        marginVertical: 20,
        backgroundColor: theme.colors.secondary,
    },
});
import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.neutralAlt,
    },
    containerScrollView: {
        padding: 20,
    },
    submitButton: {
        width: '90%',
        marginVertical: 20,
        backgroundColor: theme.colors.primaryAlt,
    },
});
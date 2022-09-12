import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    modalLabel: {
        color: theme.colors.darkGray,
    }
});
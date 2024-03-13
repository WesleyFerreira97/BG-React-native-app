import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.neutralAlt,
    },
    containerScrollView: {
        flexGrow: 1,
        paddingBottom: 100
    },
});
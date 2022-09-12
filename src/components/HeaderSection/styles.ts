import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 20,
        fontFamily: theme.fonts.secondaryAlt,
        color: '#786E73',
        paddingBottom: 10,
    }
});
import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 25,
    },
    label: {
        fontFamily: theme.fonts.secondaryAlt,
        marginLeft: 10,
        color: theme.colors.darkGray,
    }
});
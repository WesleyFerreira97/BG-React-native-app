import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flex: 1,
        position: 'absolute',
        backgroundColor: 'black',
        // padding: 20
    },
    modalButton: {
        width: '100%',
        backgroundColor: theme.colors.neutral,
        borderRadius: 7,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    label: {
        fontFamily: theme.fonts.secondary,
        color: theme.colors.secondaryAlt,
        paddingVertical: 5,
    },
    modalContent: {
        backgroundColor: '#000',
        opacity: .8,
        height: '100%',
        width: '100%',
    }
});

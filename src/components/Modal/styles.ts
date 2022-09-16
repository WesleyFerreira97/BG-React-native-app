import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        position: 'absolute',
        backgroundColor: '#000',
        opacity: .8,
        height: '100%',
        width: '100%',
    },
    modalContent: {
        backgroundColor: theme.colors.neutralAlt,
        width: '90%',
        borderRadius: 7,
        padding: 20,
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

});

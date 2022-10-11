import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    modalOverlay: {
        position: 'absolute',
        backgroundColor: '#000',
        opacity: .8,
        height: '100%',
        width: '100%',
    },
    modalButton: {
        // Open button
        width: '100%',
        backgroundColor: theme.colors.neutral,
        borderRadius: 7,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalWrap: {
        backgroundColor: theme.colors.neutralAlt,
        width: '90%',
        borderRadius: 7,
        overflow: 'hidden',
    },
    modalContent: {
        padding: 10,

    },
    modalFooter: {
        marginTop: 10,
    },
    closeButton: {
        backgroundColor: theme.colors.neutral,
        width: "100%",
        padding: 10,
        alignItems: "center",
    },
    labelContainer: {
        backgroundColor: theme.colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        margin: 5,
    },
    label: {
        fontFamily: theme.fonts.secondary,
        color: theme.colors.neutral,
        paddingVertical: 5,
    },

});

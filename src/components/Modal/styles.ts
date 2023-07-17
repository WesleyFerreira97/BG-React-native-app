import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    modalOverlay: {
        position: 'absolute',
        backgroundColor: '#000',
        opacity: .5,
        height: '100%',
        width: '100%',
        zIndex: -1,
    },
    modalButton: {
        miWidth: '33%',
        maxWidth: '100%',
        overflow: 'hidden',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    modalWrap: {
        backgroundColor: theme.colors.neutralAlt,
        width: '90%',
        borderRadius: 7,
        overflow: 'hidden',
        maxHeight: '70%',
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
    }
});
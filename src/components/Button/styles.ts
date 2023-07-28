import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
        overflow: 'hidden',
        position: "relative"
    },
    text: {
        fontSize: 15,
        color: "#fff",
        fontFamily: theme.fonts.secondary,
    },
    spinner: {
        marginRight: 15,
        position: "absolute",
        left: 15,
    }
});
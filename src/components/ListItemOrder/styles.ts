import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

const componentHeight = 75;

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingHorizontal: 20,
        borderBottomColor: theme.colors.darkGray,
        borderBottomWidth: 0.2,
        paddingVertical: 15,
    },
    innerContainer: {
        flexGrow: 1,
        flexDirection: "row",
        alignItems: "center",
        height: componentHeight,
    },
    thumbnail: {
        width: 80,
        height: "100%",
        borderRadius: 6,
        marginRight: 14,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.secondaryAlt,
    },
    title: {
        fontSize: 18,
        fontFamily: theme.fonts.secondaryAlt,
        letterSpacing: 0.3,
        color: theme.colors.primaryAlt,
        fontWeight: "bold",
    },
    editProduct: {
        height: componentHeight,
        flexGrow: 0,
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: "row",
        gap: 25
    },
});
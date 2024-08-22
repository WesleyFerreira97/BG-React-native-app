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
        marginVertical: 10,
        borderBottomColor: theme.colors.darkGray,
        borderBottomWidth: 1,
        paddingBottom: 10
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
        borderRadius: 10,
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
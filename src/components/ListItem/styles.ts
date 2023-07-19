import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

const componentHeight = 75;

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginVertical: 10,
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
    },
    title: {
        fontSize: 15,
        fontFamily: theme.fonts.secondary,
        color: theme.colors.primaryAlt,
        fontWeight: "bold",
    },
    editProduct: {
        width: 30,
        height: componentHeight,
        flexGrow: 0,
        justifyContent: 'center',
        alignItems: "center",
    }
});
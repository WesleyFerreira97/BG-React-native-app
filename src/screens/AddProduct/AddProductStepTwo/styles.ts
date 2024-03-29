import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../../styles/theme';

const { height, width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
    scrollViewStyle: {
        flex: 1,
        backgroundColor: theme.colors.neutralAlt,
    },
    formWrap: {
        alignItems: "center",
        marginVertical: 14,
        minHeight: height,
    },
    form: {
        width: "90%",
        marginVertical: 25,
    },
    footer: {
        width: "100%",
        paddingHorizontal: 20,
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    galleryByColor: {
        backgroundColor: theme.colors.neutral,
        marginVertical: 10,
        width: '100%',
    }
});
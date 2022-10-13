import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../../styles/theme';

const { height, width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
    scrollViewStyle: {
        backgroundColor: theme.colors.neutralAlt,
    },
    formWrap: { 
        alignItems: "center",
    },
    form: {
        height: height,
        width: "90%",
    },
    footer: {
        marginVertical: 10,
    },
    galleryByColor: {
        backgroundColor: theme.colors.neutral,
    },
    galleryHeader: {
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.primary,
        borderTopEndRadius: 5,
        borderTopStartRadius: 5,
        padding: 7,
    },
    galleryTitle: {
        color: theme.colors.neutral,
        fontSize: 14,
        fontFamily: theme.fonts.secondaryAlt
    },
    galleryOptions: {
        flexDirection: "row",
        alignItems: "center",
    }
});
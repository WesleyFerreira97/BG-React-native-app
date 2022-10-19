import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../../styles/theme';

const { height, width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
    scrollViewStyle: {
        backgroundColor: theme.colors.neutralAlt,
    },
    formWrap: {
        flex: 1,
        alignItems: "center",
    },
    form: {
        height: height / 1.5,
        width: "90%",
    },
    footer: {
        marginVertical: 10,
    },
    galleryByColor: {
        backgroundColor: theme.colors.neutral,
        marginVertical: 10,
        width: '100%',
    }
});
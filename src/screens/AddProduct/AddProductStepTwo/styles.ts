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
    }
});
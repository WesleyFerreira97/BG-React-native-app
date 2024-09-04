import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.neutral
    },
    headerScreen: {
        position: "relative",
        backgroundColor: theme.colors.primary,
        width: "100%",
        height: 70,
        paddingHorizontal: 20,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    headerTitle: {
        color: theme.colors.neutralAlt,
        fontSize: 22,
        fontFamily: theme.fonts.primary,
    },
    buttonBack: {
        position: "absolute",
        left: 0,
        marginLeft: 20
    },
    labelLg: {
        fontSize: 25,
        fontFamily: theme.fonts.secondary,
        fontWeight: "800",
        lineHeight: 40,
        color: theme.colors.secondaryAlt
    },
    orderContent: {
        height: "100%",
        flex: 1,
        padding: 30
    }
});
import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        position: "relative",
        marginBottom: 35,
    },
    headerContent: {
        width: "100%",
    },
    homeTitle: {
        color: theme.colors.neutral,
        fontSize: 24,
        fontFamily: theme.fonts.secondaryAlt
    },
    homeSubtitle: {
        color: theme.colors.neutral,
        fontSize: 18,
        fontFamily: theme.fonts.secondary
    },
    searchBar: {
        flexDirection: "row",
        overflow: "hidden",
        position: "absolute",
        bottom: -20,
        borderRadius: 8,
    }
});

import { Dimensions, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

const { height, width, scale } = Dimensions.get("screen");

export const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    galleryModalContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    galleryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: 'black',
        minHeight: 150,
        width: '100%',
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
    galleryOptions: {
        flexDirection: "row",
        alignItems: "center",
    },
    galleryTitle: {
        color: theme.colors.neutral,
        fontSize: 14,
        fontFamily: theme.fonts.secondaryAlt
    },
    gridImage: {
        width: '100%',
        height: '100%',
    },
    gridImageFull: {
        width: '75%',
        aspectRatio: 2 / 3,
        marginVertical: 15,
    }
});

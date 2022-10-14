import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
    },
    galleryGrid: {
      flexDirection: 'row',    
      flexWrap: 'wrap',
    },
    gridItem: {
        width: '33%',  
        height: 100,
        backgroundColor: 'black',
        overflow: 'hidden',
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
});

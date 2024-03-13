import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        marginVertical: 12,
    },
    componentLabel: {
        fontSize: 16,
        fontFamily: theme.fonts.secondaryAlt,
        color: theme.colors.darkGray,
        paddingVertical: 2
    },
    itemsContainer: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 6,
    },
    itemButton: {
        backgroundColor: theme.colors.secondary,
        borderRadius: 7,
    },
    itemLabelInactive: {
        fontSize: 14,
        fontFamily: theme.fonts.secondaryAlt,
        color: theme.colors.darkGray,
        paddingHorizontal: 15,
        paddingVertical: 3
    },
    itemLabelActive: {
        fontSize: 14,
        fontFamily: theme.fonts.secondaryAlt,
        color: theme.colors.neutral,
        paddingHorizontal: 15,
        paddingVertical: 3,
    },
});



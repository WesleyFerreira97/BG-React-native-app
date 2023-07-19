import { ScrollView, Text, View, Animated } from 'react-native';
import { useTheme } from '../../providers/ThemeContext';
import { styles } from './styles';
import { theme } from '../../styles/theme';

const headerMaxHeight = 230;
const headerMinHeight = 190;

export function HomeScreen() {
    const { theme, setTheme } = useTheme();
    const StickyHeader = new Animated.Value(0);

    const AnimatedHeader = StickyHeader.interpolate({
        inputRange: [headerMinHeight, headerMaxHeight],
        outputRange: [headerMaxHeight, headerMinHeight],
        extrapolate: "clamp",

    })

    return (
        <View style={styles.container}>
            <Animated.View style={{
                ...styles.headerContainer,
                height: AnimatedHeader
            }}>
                <View style={styles.headerContent}>
                    <Text style={styles.homeTitle}>Bela Garota</Text>
                    <Text style={styles.homeSubtitle}>Administrativo</Text>
                </View>

                <View style={styles.searchBar}>
                    <View style={{
                        height: 56,
                        width: "80%",
                        backgroundColor: theme.colors.primaryAlt,
                    }} />
                    <View style={{
                        height: 56,
                        flex: 1,
                        backgroundColor: theme.colors.secondary,
                    }} />
                </View>

            </Animated.View>
            <ScrollView
                style={{
                    flex: 1,
                    width: "100%",
                }}
                contentContainerStyle={{
                    alignItems: "center",
                }}
                onScroll={(e) => {
                    const scrollY = e.nativeEvent.contentOffset.y;
                    StickyHeader.setValue(scrollY);
                }}
            >
                <ListView />
                <ListView />
                <ListView />
                <ListView />
                <ListView />
                <ListView />
                <ListView />
                <ListView />
                <ListView />
            </ScrollView>
        </View>
    );
}

const ListView = () => {
    return (
        <View style={{
            width: "90%",
            height: 200,
            backgroundColor: theme.colors.darkGray,
        }}>
            <Text style={{ color: "#fff" }}>List Item</Text>

        </View>
    )
}
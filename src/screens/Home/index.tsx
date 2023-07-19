import { ScrollView, Text, View, Animated } from 'react-native';
import { useTheme } from '../../providers/ThemeContext';
import { styles } from './styles';

const headerMaxHeight = 250;
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
            <Animated.View style={[
                styles.headerContainer,
                {
                    height: AnimatedHeader,
                }
            ]}>
                <Text style={styles.homeTitle}>Bela Garota</Text>
                <Text style={styles.homeSubtitle}>Administrativo</Text>
            </Animated.View>
            <ScrollView
                style={{
                    flex: 1,
                    width: "100%",
                    backgroundColor: theme.colors.tertiary,
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
            backgroundColor: "black",
        }}>
            <Text style={{ color: "#fff" }}>List Item</Text>

        </View>
    )
}
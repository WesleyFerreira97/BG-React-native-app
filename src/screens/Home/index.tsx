import { ScrollView, Text, View, Animated, Dimensions } from 'react-native';
import { useTheme } from '../../providers/ThemeContext';
import { styles } from './styles';
import React from 'react';

const windowHeight = Dimensions.get('window').height;

const headerMaxHeight = windowHeight * 0.4;
const headerMinHeight = windowHeight * 0.2;

export function HomeScreen() {
    const { theme, setTheme } = useTheme();
    const StickyHeader = new Animated.Value(0);

    const AnimatedHeader = StickyHeader.interpolate({
        inputRange: [0, headerMaxHeight - headerMinHeight],
        outputRange: [headerMaxHeight, headerMinHeight],
        extrapolate: "identity",
    })

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.secondary }
            ]} >
            <Animated.View style={[
                styles.headerContainer,
                {
                    height: AnimatedHeader,
                }
            ]}>
                <Text>Header Screen</Text>
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
                scrollEventThrottle={300}
                onScroll={(e) => {
                    const scrollY = e.nativeEvent.contentOffset.y;
                    StickyHeader.setValue(scrollY);
                }}
            >
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
import { ScrollView, Text, View, Animated } from 'react-native';
import { useTheme } from '../../providers/ThemeContext';
import { styles } from './styles';
import { ListItem } from '../../components/ListItem';
import { SearchInput } from '../../components/SearchInput';
import { useState } from 'react';

const headerMaxHeight = 230;
const headerMinHeight = 190;

export function HomeScreen() {
    const { theme, setTheme } = useTheme();
    const [searchValue, setSearchValue] = useState('');
    const StickyHeader = new Animated.Value(0);

    const AnimatedHeader = StickyHeader.interpolate({
        inputRange: [headerMinHeight, headerMaxHeight],
        outputRange: [headerMaxHeight, headerMinHeight],
        extrapolate: "clamp",
    })

    const handleSearch = (value: string) => {
        setSearchValue(value);
        console.log(searchValue);
    }

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
                    <SearchInput
                        label='Buscar'
                        value={searchValue}
                        handleChange={(e) => handleSearch(e)}
                    />
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
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
            </ScrollView>
        </View>
    );
}

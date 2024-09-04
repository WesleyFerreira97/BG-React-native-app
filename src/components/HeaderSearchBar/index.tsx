import React from 'react'
import { Animated, View } from 'react-native'
import { styles } from "./style"
import { Text } from 'react-native-paper'
import { SearchInput } from '../SearchInput'
import { theme } from '../../styles/theme'

type HeaderSearchProps = {
    handleSearch: (e?: string) => void
    searchValue: string;
    headerMinHeight: number;
    headerMaxHeight: number;
    subTitle?: string;
}

export function HeaderSearchBar(props: HeaderSearchProps) {
    const StickyHeader = new Animated.Value(0);

    const AnimatedHeader = StickyHeader.interpolate({
        inputRange: [props.headerMinHeight, props.headerMaxHeight],
        outputRange: [props.headerMaxHeight, props.headerMinHeight],
        extrapolate: "clamp",
    })

    return (
        <Animated.View style={{
            ...styles.headerContainer,
            height: AnimatedHeader
        }}>
            <View style={styles.headerContent}>
                <Text style={styles.homeTitle}>Bela Garota</Text>
                <Text style={styles.homeSubtitle}>{props.subTitle}</Text>
            </View>

            <View style={styles.searchBar}>
                <SearchInput
                    label='Buscar'
                    value={props.searchValue}
                    handleChange={(e) => props.handleSearch(e)}
                />
                <View style={{
                    height: 56,
                    flex: 1,
                    backgroundColor: theme.colors.secondary,
                }} />
            </View>

        </Animated.View>
    )
}

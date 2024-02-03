import { ScrollView, Text, View, Animated, Image } from 'react-native';
import { useTheme } from '../../providers/ThemeContext';
import { styles } from './styles';
import { ListItem } from '../../components/ListItem';
import { SearchInput } from '../../components/SearchInput';
import { useEffect, useState } from 'react';
import { AllProductProps } from '../../@types/product';
import { useSelect } from '../../hooks/useSelect';
import { supaDb } from '../../services/supadb';
import FallbackImage from "../../../assets/images/default.jpg"

const headerMaxHeight = 230;
const headerMinHeight = 190;

export function HomeScreen() {
    const { theme, setTheme } = useTheme();
    const [searchValue, setSearchValue] = useState('');
    const [test, setTest] = useState([]);
    const StickyHeader = new Animated.Value(0);

    const { selectResponse, selectResponseError } = useSelect<AllProductProps[]>({
        tableName: 'products',
        select: ['title', 'bucket_name', 'bucket_folder', 'id'],
        limit: 3,
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!selectResponse) return;

            const itemsData = await Promise.all(selectResponse.map(async (item) => {
                const bucketName = item.bucket_name;
                const thumb = `product/${item.bucket_folder}/${item.id}/main`;

                const { data } = await supaDb.storage.from(bucketName).getPublicUrl(thumb);
                const url = data.publicUrl;

                const { data: imageList } = await supaDb.storage.from(bucketName).list(thumb);

                const ThumbFallback = Image.resolveAssetSource(FallbackImage).uri;

                const thumbImage = imageList.length > 0
                    ? `${url}/${imageList[0].name}`
                    : ThumbFallback;

                return {
                    title: item.title,
                    url: thumbImage,
                    id: item.id,
                };
            }));


            const validUrls = itemsData.filter(item => item !== undefined);

            setTest(validUrls);
        };

        fetchData();
    }, [selectResponse, selectResponseError]);

    const AnimatedHeader = StickyHeader.interpolate({
        inputRange: [headerMinHeight, headerMaxHeight],
        outputRange: [headerMaxHeight, headerMinHeight],
        extrapolate: "clamp",
    })

    const handleSearch = (value: string) => {
        setSearchValue(value);
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
                {/* {selectResponse?.map((item, key) => (
                    <ListItem
                        key={key}
                        title={item.title}
                    />
                ))} */}

                {test && test.map((item, key) => (
                    <>
                        <Image
                            key={key}
                            source={{ uri: item.url }}
                            style={{
                                width: 100,
                                height: 100,
                            }}
                        />
                    </>
                ))}
            </ScrollView>
        </View>
    );
}

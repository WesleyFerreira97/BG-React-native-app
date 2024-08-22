import { ScrollView, Text, View, Animated, Image } from 'react-native';
import { useTheme } from '../../providers/ThemeContext';
import { styles } from './styles';
import { ListItem } from '../../components/ListItem';
import { SearchInput } from '../../components/SearchInput';
import { useCallback, useEffect, useState } from 'react';
import { AllProductProps } from '../../@types/product';
import { useSelect } from '../../hooks/useSelect';
import { supaDb } from '../../services/supadb';
import FallbackImage from "../../../assets/images/default.jpg"
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const headerMaxHeight = 230;
const headerMinHeight = 190;

export function HomeScreen() {
    const { theme, setTheme } = useTheme();
    const [searchValue, setSearchValue] = useState('');
    const [itemsData, setItemsData] = useState([]);
    const StickyHeader = new Animated.Value(0);
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const initialValue = {
        tableName: 'products',
        selectColumns: ['title', 'bucket_name', 'bucket_folder', 'id'],
        limit: 1000,
    }
    const { selectResponse, selectResponseError, selectData } = useSelect<AllProductProps[]>(initialValue);

    const onRefresh = () => {
        setRefreshing(true);

        selectData(initialValue)

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const fetchListData = async () => {
        if (!selectResponse) return;
        console.log("Fez fetch");

        const itemsData = await Promise.all(selectResponse.map(async (item) => {
            const bucketName = item.bucket_name;
            const thumb = `product/${item.bucket_folder}/${item.id}/main`;

            const { data } = await supaDb.storage.from(bucketName).getPublicUrl(thumb);
            const url = data.publicUrl;

            const { data: imageList } = await supaDb.storage.from(bucketName).list(thumb, { limit: 1 });

            const ThumbFallback = Image.resolveAssetSource(FallbackImage).uri;

            const thumbImage = imageList.length > 0
                ? `${url}/${imageList[0].name}`
                : ThumbFallback;

            return {
                title: item.title,
                thumb: thumbImage,
                id: item.id,
            };
        }));

        const validUrls = itemsData.filter(item => item !== undefined);

        setItemsData(validUrls);
    };

    useEffect(() => {
        fetchListData();
    }, [selectResponse, selectResponseError]);

    const AnimatedHeader = StickyHeader.interpolate({
        inputRange: [headerMinHeight, headerMaxHeight],
        outputRange: [headerMaxHeight, headerMinHeight],
        extrapolate: "clamp",
    })

    const handleSearch = (value: string) => {
        setSearchValue(value);
    }

    const handleNavigate = (id: string) => {
        navigation.navigate('EditProduct', { itemId: id });
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
            {itemsData && (
                <FlatList
                    data={itemsData}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleNavigate(item.id)}>
                            <ListItem
                                image={item.thumb}
                                title={item.title}
                                itemId={item.id}
                            />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            )}

            <Button
                onPress={() => selectData(initialValue)}
                mode='contained'
                style={{ marginVertical: 20 }}
            >
                Atualizar Lista
            </Button>
        </View>
    );
}

import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelect } from '../../hooks/useSelect';
import { ShoppingBagOpen } from 'phosphor-react-native';
import { ListItemOrder } from "../../components/ListItemOrder"
import { styles } from './styles';
import { FlatList } from 'react-native-gesture-handler';
import { theme } from '../../styles/theme';
import { HeaderSearchBar } from '../../components/HeaderSearchBar';

export type ProductOrderProps = {
    productTitle: string;
    price?: number;
    selectedSize?: string | number;
    selectedColor?: string;
    image: string;
}

export type OrderProps = {
    id: string;
    created_at: string;
    client_order: ProductOrderProps[];
    client_number: number;
    order_fulfilled: boolean;
    client_name: string;
    comments?: string
}

type ListOrderProps = {
    id: string;
    name: string;
    orderFulfilled: boolean;
}

export function AllOrders() {
    const initialValue = {
        tableName: 'orders',
        selectColumns: ["*"],
        limit: 1000,
    }
    const { selectResponse, selectResponseError, selectData } = useSelect<OrderProps[]>(initialValue);
    const [listOrders, setListOrders] = useState<ListOrderProps[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        if (!selectResponse) return
        const allOrders = []

        selectResponse.forEach((item, index) => {
            const clientOrder = {
                id: item.id,
                name: item.client_name,
                orderFulfilled: item.order_fulfilled,
            }

            return allOrders.push(clientOrder)
        })

        setListOrders(allOrders)
    }, [selectResponse, selectResponseError])

    const handleSearch = (value?: string) => {
        setSearchValue(value);
    }


    return (
        <View style={styles.container}>
            <HeaderSearchBar
                handleSearch={handleSearch}
                searchValue={searchValue}
                headerMaxHeight={150}
                headerMinHeight={100}
                subTitle='Pedidos'
            />

            {listOrders && (
                <FlatList
                    data={listOrders}
                    renderItem={({ item }) => (
                        <ListItemOrder
                            icon={<ShoppingBagOpen size={33} color={theme.colors.neutral} />}
                            title={item.name}
                            itemId={item.id}
                            orderFulfilled={item.orderFulfilled}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={refreshing}
                //         onRefresh={onRefresh}
                //     />
                // }
                />
            )}
        </View>
    );
}
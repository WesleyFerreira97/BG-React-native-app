import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useSelect } from '../../hooks/useSelect';
import type { OrderProps } from '../AllOrders';
import { styles } from './styles';

export function ClientOrder({ route }) {
    const { itemId } = route.params
    const { selectResponse, selectResponseError } = useSelect<OrderProps>({
        tableName: "orders",
        selectColumns: ["*"],
        limit: 1,
        match: { id: itemId },
        single: true
    })

    const fallbackResponse = {
        client_name: 'Não inseriu nome',
        id: 'ID não disponível',
        client_number: 'Número do cliente não disponível',
        // comments: 'Comentários não disponíveis',
        order_fulfilled: 'Status do pedido não disponível'
    };

    const response = { ...fallbackResponse, ...selectResponse };
    console.log(selectResponse.comments);

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>Comentários : {selectResponse.comments}</Text>

        </View>
    );
}
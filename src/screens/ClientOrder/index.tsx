import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useSelect } from '../../hooks/useSelect';
import type { OrderProps } from '../AllOrders';
import { styles } from './styles';
import { ArrowLeft } from 'phosphor-react-native';
import { theme } from '../../styles/theme';
import { ScrollView } from 'react-native-gesture-handler';

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
        comments: 'Comentários não disponíveis',
        order_fulfilled: 'Status do pedido não disponível'
    };

    const response = {}
    console.log(selectResponse, "client order");

    return (
        <View style={styles.container}>
            <View style={styles.headerScreen}>
                <ArrowLeft
                    size={45}
                    color={theme.colors.neutralAlt}
                    style={styles.buttonBack}
                />
                <Text style={styles.headerTitle}>Pedido</Text>
            </View>
            <ScrollView contentContainerStyle={styles.orderContent}>

                <Text style={styles.labelLg}>Dados do pedido :</Text>
                <Text style={{ fontSize: 20 }}>Comentários : {fallbackResponse.comments}</Text>
            </ScrollView>
        </View>
    );
}
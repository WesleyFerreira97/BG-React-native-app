import { Text, View } from 'react-native';

import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';

type EditProps = {
    itemId: string
}

export function EditProducts(props: EditProps) {
    const route = useRoute();

    console.log(route.params);

    return (
        <View style={styles.container}>
            <Text>Pedidos Screen</Text>
        </View>
    );
}
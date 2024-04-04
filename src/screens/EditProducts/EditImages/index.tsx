import React from 'react'
import { Text, View } from 'react-native'
import { Button } from '../../../components/Button'
import { useBucket } from '../../../hooks/useBucket';

export function EditImages({ navigation, route }) {
    const { bucketPath } = route.params;
    console.log(bucketPath, "bucketPath");

    const { } = useBucket({ bucketName: 'product;' });
    const handleSomething = () => {
        navigation.goBack()
    }

    return (
        <View>
            <Button
                onPress={handleSomething}
                text="Go to EditProducts"
            />
        </View>
    )
}


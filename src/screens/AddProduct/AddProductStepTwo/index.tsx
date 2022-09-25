import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { BucketProps } from '../../../@types/product';
import { useSelect } from '../../../hooks/useSelect';

import { styles } from './styles';

export function AddProductStepTwo({ route }) {
    const { selectResponse, selectResponseError } = useSelect({
        select: ['bucket_name', 'bucket_folder'],
        match: route.params.productId,
    });

    useEffect(() => {
        console.log(selectResponse, 'select response ');

    }, [selectResponse])

    return (
        <View style={styles.container}>
            <Text>Step Two</Text>
        </View>
    );
}

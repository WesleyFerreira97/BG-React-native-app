import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { BucketProps } from '../../../@types/product';
import { ImageInput } from '../../../components/ImageInput';
import { useSelect } from '../../../hooks/useSelect';

import { styles } from './styles';

export function AddProductStepTwo({ route }) {
    const { selectResponse, selectResponseError } = useSelect<BucketProps>({
        select: ['bucket_name', 'bucket_folder'],
        match: route.params.productId,
    });

    useEffect(() => {
        console.log(selectResponse, 'select response ');

    }, [selectResponse])

    return (
        <View style={styles.container}>
            <Text>Step Two</Text>
            <Formik
                initialValues={{ email: '' }}
                onSubmit={values => console.log(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <ImageInput />
                        <Button onPress={handleSubmit}>Submit</Button>
                    </View>
                )}
            </Formik>
        </View>
    );
}

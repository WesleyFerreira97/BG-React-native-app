import { Text, View } from 'react-native';
import { styles } from './styles';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useSelect } from '../../hooks/useSelect';
import type { AllProductProps, ProductProps } from '../../@types/product';
import { TextInput } from '../../components/TextInput';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { supaDb } from '../../services/supadb';
import { PostgrestError } from '@supabase/supabase-js';
import { Button } from '../../components/Button';

type EditProps = {
    itemId: string
}

type UseUpdateProps = {
    productId: string | number;
    data: Partial<ProductProps>;
}

function useUpdate() {
    const [updateData, setUpdateData] = useState<UseUpdateProps>();
    const [updateResponse, setUpdateResponse] = useState<T | null>(null);
    const [updateError, setUpdateError] = useState<PostgrestError>();

    const update = async ({ data, productId }: UseUpdateProps) => {
        const { data: dataDb, error } = await supaDb
            .from('products')
            .update(data)
            .eq('id', productId);

        setUpdateResponse(dataDb as T);
        setUpdateError(error);
    }

    useEffect(() => {
        if (!updateData) return;

        update(updateData);
    }, [updateData]);

    return { setUpdateData, updateResponse, updateError };
}


export function EditProducts() {
    const { params }: RouteProp<{ params: EditProps }> = useRoute();
    const { setUpdateData, updateError, updateResponse } = useUpdate();
    const { selectResponse, selectResponseError } = useSelect<AllProductProps>({
        tableName: 'products',
        select: ['title', 'bucket_name', 'bucket_folder', 'id'],
        limit: 1,
        match: params.itemId
    });

    const responseData: AllProductProps = selectResponse ? selectResponse[0] : null;

    const initialValues = {
        title: responseData?.title

    }

    useEffect(() => {
        console.log('updateError', updateError);
        console.log('updateResponse', updateResponse);

    }, [updateError, updateResponse])

    const handleSubmitProduct = (props: UseUpdateProps) => {
        setUpdateData(props);
    }

    return (
        <View style={styles.container}>
            <Text>Pedidos Screen</Text>
            {selectResponse
                ? (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values: ProductProps) => {
                            handleSubmitProduct({
                                data: {
                                    ...values
                                },
                                productId: responseData.id
                            });
                        }}>
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, submitForm }) => (
                            <>
                                <TextInput name='title' label='Título' initialValue={values.title} />
                                <Text>{selectResponse.title}</Text>

                                <Button
                                    onPress={handleSubmit}
                                    text='Cadastrar'
                                />
                            </>
                        )}
                    </Formik>
                ) :
                <Text>Carregando </Text>
            }
        </View>
    );
}

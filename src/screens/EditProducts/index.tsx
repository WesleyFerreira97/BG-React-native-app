import { Text, View } from 'react-native';
import { styles } from './styles';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useSelect } from '../../hooks/useSelect';
import type { AllProductProps, ProductProps } from '../../@types/product';
import { TextInput } from '../../components/TextInput';
import { Formik } from 'formik';
import { useEffect } from 'react';

type EditProps = {
    itemId: string
}

export function EditProducts() {
    const { params }: RouteProp<{ params: EditProps }> = useRoute();

    const { selectResponse, selectResponseError } = useSelect<AllProductProps>({
        tableName: 'products',
        select: ['title', 'bucket_name', 'bucket_folder', 'id'],
        limit: 3,
        match: params.itemId
    });

    const responseData: AllProductProps = selectResponse ? selectResponse[0] : null;

    const initialValues = {
        title: responseData?.title

    }

    return (
        <View style={styles.container}>
            <Text>Pedidos Screen</Text>
            {selectResponse
                ? (<Formik
                    initialValues={initialValues}
                    // validationSchema={productValidation}
                    // enableReinitialize={true}
                    // validateOnMount={true}
                    onSubmit={(values: ProductProps) => {
                        // handleSubmitProduct(values);
                    }} >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, submitForm }) => (
                        <>
                            <TextInput name='title' label='Título' initialValue={values.title} />
                            <Text>{selectResponse.title}</Text>
                        </>
                    )}
                </Formik>)
                : <Text>Carregando </Text>}
        </View>
    );
}

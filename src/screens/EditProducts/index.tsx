import { ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useSelect } from '../../hooks/useSelect';
import type { AllProductProps, ProductProps } from '../../@types/product';
import { TextInput } from '../../components/TextInput';
import { Formik } from 'formik';
import { Button } from '../../components/Button';
import { SelectSize } from '../../components/SelectSize';
import { SelectInput } from '../../components/SelectInput';
import { SwitchInput } from '../../components/SwitchInput';
import { useCategories } from '../../hooks/useCategories';
import { useUpdate } from '../../hooks/useUpdate';

type EditProps = {
    itemId: string
}

export function EditProducts({ navigation }) {
    const { params }: RouteProp<{ params: EditProps }> = useRoute();
    const { setUpdateData, updateError, updateResponse } = useUpdate();
    const { allCategories, categoriesError } = useCategories();
    const { selectResponse, selectResponseError } = useSelect<AllProductProps>({
        tableName: 'products',
        // select: ['title', 'bucket_name', 'bucket_folder', 'id'],
        select: ["*"],
        limit: 1,
        match: params.itemId
    });

    const responseData: AllProductProps = selectResponse ? selectResponse[0] : null;

    const initialValues: ProductProps = {
        title: responseData?.title,
        price: responseData?.price,
        description: responseData?.description,
        sizes_available: responseData?.sizes_available,
        type_product_sizes: responseData?.type_product_sizes,
        product_categories: responseData?.product_categories,
        product_available: responseData?.product_available,
    }

    const handleNavigateEditProducts = () => {
        navigation.navigate(
            'EditImages',
            { bucketPath: `product/${responseData.bucket_folder}/${responseData.id}` }
        )
    };

    return (
        <ScrollView contentContainerStyle={styles.containerScrollView}>
            {responseData
                ? (
                    <>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values: ProductProps) => {
                                setUpdateData({
                                    data: {
                                        ...values
                                    },
                                    productId: responseData.id
                                });
                            }}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, submitForm }) => (
                                <View style={{ padding: 20 }}>
                                    <TextInput
                                        name='title'
                                        label='Título'
                                        value={values.title}
                                    />
                                    <TextInput
                                        name='description'
                                        label='Descrição'
                                        value={values.description}
                                    />
                                    {!categoriesError &&
                                        <SelectInput
                                            name='product_categories'
                                            label='Categorias'
                                            value={values.product_categories}
                                        >
                                            {allCategories?.map((category) => (
                                                <SelectInput.Item
                                                    key={category.id}
                                                    label={category.title}
                                                    value={category.slug}
                                                />
                                            ))}
                                        </SelectInput>
                                    }
                                    <TextInput
                                        name='price'
                                        label='Preço'
                                        value={values.price}
                                        keyboardType='numeric'
                                    />
                                    <SwitchInput
                                        name='product_available'
                                        label='Disponibilidade'
                                        value={values.product_available}
                                    />
                                    {/* <SelectSize
                                        sizeType={values.type_product_sizes}
                                        availableSizes={values.sizes_available}
                                    /> */}
                                    <Button
                                        onPress={handleNavigateEditProducts}
                                        text='Editar imagens'
                                    />
                                    <Button
                                        onPress={handleSubmit}
                                        text='Concluir alterações'
                                    />
                                </View>
                            )}
                        </Formik>
                    </>
                ) :
                <Text>Carregando </Text>
            }
        </ScrollView>
    );
}

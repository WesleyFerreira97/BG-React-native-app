import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from './styles';

import { HeaderScreen } from '../../components/HeaderScreen';
import { useTheme } from '../../providers/ThemeContext';
import { Formik } from 'formik';
import { Button } from 'react-native-paper';
import * as Yup from 'yup';
import { useInsert } from '../../hooks/useInsert';
import type { ProductProps, ProductSizes } from '../../@types/product'
import { useCategories } from '../../hooks/useCategories';
import { SelectInput } from '../../components/SelectInput';
import { TextInput } from '../../components/TextInput';
import { HeaderSection } from '../../components/HeaderSection';
import { Modal } from '../../components/Modal';
import { CheckboxInput } from '../../components/CheckboxInput';

const initialValues: ProductProps = {
    title: "",
    description: "",
    product_categories: "",
    product_sizes: {
        P: 'size P Value ',
        M: 'size M Value ',
        G: 'size G Value ',
        GG: 'size GG Value ',
    },
    bucket: "",
    bucket_folder: "",
    price: 0,
}

const productValidation = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Titulo muito curto!')
        .max(50, 'Titulo muito grande!')
        .required('Titulo é obrigatório'),
});

export function AddProduct() {
    const { theme } = useTheme();
    const { dataResponse, setData } = useInsert<ProductProps>("products");
    const [productProps, setProductProps] = useState<any>();
    const { allCategories, categoriesError } = useCategories();
    const [stateTest, setStateTest] = useState<any>('Initial State');

    useEffect(() => {
        if (!productProps) return;

        const handleSubmitProduct = async () => {

            setData({
                title: productProps.title,
                description: productProps.description,
                product_categories: productProps.product_categories,
                product_sizes: productProps.product_sizes,
                bucket: 'photo',
                bucket_folder: `products/${productProps.product_categories}/${productProps.title}`,
                price: productProps.price,
            })
        }

        handleSubmitProduct();
    }, [productProps]);

    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme.colors.neutralAlt,
            flex: 1,

        }}>
            <HeaderScreen />

            <Formik
                initialValues={initialValues}
                validationSchema={productValidation}
                onSubmit={(values: ProductProps) => {
                    // setProductProps(values);
                    console.log(values, 'values submit log');
                }} >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, submitForm }) => (
                    <View style={{
                        // width: '100%',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                        <ScrollView style={{ flex: 1, width: '90%' }}>
                            <HeaderSection>
                                1º Etapa - Cadastro
                            </HeaderSection>

                            <TextInput
                                name='title'
                                label='Title'
                                placeholder='Titulo do produto'
                            />

                            <TextInput
                                name='description'
                                label='Descrição'
                                placeholder='Descrição do produto'
                                multiline={true}
                                numberOfLines={5}
                            />

                            {errors.title && touched.title ? (
                                <Text style={{ color: 'red' }}>{errors.title}</Text>
                            ) : null}

                            {!categoriesError && (
                                <SelectInput name="product_categories" >
                                    {allCategories?.map((item, index) => (
                                        <SelectInput.Item
                                            key={index}
                                            label={item.title}
                                            value={item.slug}
                                        />
                                    ))}
                                </SelectInput>
                            )}

                            <TextInput
                                name='price'
                                label='Price'
                                placeholder='Preço'
                                keyboardType='number-pad'
                            />
                            <Text>{stateTest}</Text>
                            <Modal
                                label='Tamanhos Disponíveis : '
                            // value={values.product_sizes}
                            >
                                {Object.values<ProductSizes[]>(values.product_sizes)
                                    .map((inputName, key, obj) => {
                                        console.log(inputName, 'inside map');

                                        return (
                                            <>
                                                {/* <CheckboxInput
                                            key={key}
                                            name={inputName}
                                            value={values.product_sizes.inputName}
                                            label={product_sizes[inputName]}
                                        /> */}
                                            </>
                                        )
                                    })}
                                <Text>{stateTest}</Text>
                                <Button onPress={() => setStateTest("Valor Alterado")}>
                                    Change State
                                </Button>
                            </Modal>
                        </ScrollView>

                        <Button
                            onPress={handleSubmit}
                            mode="contained"
                            style={styles.submitButton}
                        >
                            Cadastrar
                        </Button>
                    </View>
                )}
            </Formik>
        </View>
    );
}


import { FieldArray, Formik, useFormik } from 'formik';
import { FilePlus } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { BucketProps } from '../../../@types/product';
import { HeaderScreen } from '../../../components/HeaderScreen';
import { ImageInput } from '../../../components/ImageInput';
import { Modal } from '../../../components/Modal';
import { useFileUpload } from '../../../hooks/useFileUpload';
import { useSelect } from '../../../hooks/useSelect';
import { theme } from '../../../styles/theme';

import { styles } from './styles';

export function AddProductStepTwo({ route }) {
    // const { } = useFormik({})
    const { selectResponse, selectResponseError } = useSelect<BucketProps>({
        select: ['bucket_name', 'bucket_folder'],
        match: route.params.productId,
    });
    const [bucketFolder, setBucketFolder] = useState<string | null>(null);

    const { fileUploadResponse, setFile } = useFileUpload();

    const handleSubmit = (values) => {
        console.log(values);

        // const mainDirectory = "product";


        // setFile({
        //     file: values.image,
        //     path: `product/${selectResponse[0].bucket_folder}`,
        // })
    }

    return (
        <>
            <HeaderScreen />
            <ScrollView style={styles.scrollViewStyle}>
                <View style={styles.formWrap}>
                    <Formik
                        initialValues={{
                            blue: [],
                            green: [],
                        }}
                        onSubmit={values => handleSubmit(values)}

                    >
                        {({ handleChange, handleBlur, handleSubmit, values, }) => (
                            <>
                                <View style={styles.form}>
                                    <Modal label="Adicionar nova Cor" >
                                        <Text>Selecione uma cor : </Text>
                                        <Button>Azul</Button>
                                        <Button onPress={() => console.log('Vemelho')}>Vermelho</Button>
                                        <Button>Branco</Button>
                                    </Modal>

                                    <View style={styles.galleryByColor}>
                                        <View style={styles.galleryHeader}>
                                            <View style={styles.galleryOptions}>
                                                <FilePlus
                                                    size={32}
                                                    style={{ marginRight: 5 }}
                                                    color={theme.colors.neutralAlt}
                                                />
                                                <Text style={styles.galleryTitle}>Editar</Text>
                                            </View>
                                            <Text style={styles.galleryTitle}>Rosa</Text>
                                        </View>
                                    </View>

                                </View>

                                <View style={styles.footer}>
                                    <Button
                                        onPress={handleSubmit}
                                        mode="contained"
                                        color={theme.colors.primary}
                                    >
                                        Concluir
                                    </Button>
                                </View>

                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </>
    );
}

// 1º Recebe o Id do produto
// 2º Com o Id faz uma requisição no banco e retorna o bucket folder
// 3º Cria um path para upload do arquivo com base no bucket folder e a cor selecionada



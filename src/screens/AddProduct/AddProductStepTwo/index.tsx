import { FieldArray, Formik, useFormik } from 'formik';
import { FilePlus } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { BucketProps } from '../../../@types/product';
import { HeaderScreen } from '../../../components/HeaderScreen';
import { GalleryInput } from '../../../components/GalleryInput';
import { Modal } from '../../../components/Modal';
import { useFileUpload } from '../../../hooks/useFileUpload';
import { useSelect } from '../../../hooks/useSelect';
import { theme } from '../../../styles/theme';

import { styles } from './styles';
import { SnackBar } from '../../../components/SnackBar';

type GallerySectionProps = {
    slug: string,
    name: string,
    color: string,
}

const sectionColors = {
    blue: {
        slug: 'blue',
        name: 'Azul',
        color: '#083AA9'
    },
    white: {
        slug: 'white',
        name: "Branco",
        color: '#B2B2B2',
    }
}

export function AddProductStepTwo({ route }) {
    const [bucketFolder, setBucketFolder] = useState<string | null>(null);
    const { fileUploadResponse, setFile } = useFileUpload();
    const [gallerySections, setGallerySections] = useState<GallerySectionProps[] | null>([sectionColors.blue]);
    const { selectResponse, selectResponseError } = useSelect<BucketProps>({
        select: ['bucket_name', 'bucket_folder'],
        match: route.params.productId,
    });

    const handleSection = (sectionProps: GallerySectionProps) => {
        // console.log(sectionProps);

        const isDuplicate = gallerySections.some(section => section.name === sectionProps.name);
        console.log(isDuplicate);

        setGallerySections(prevstate => [...prevstate, sectionProps]);
    }

    const handleSubmit = (values) => {
        // const mainDirectory = "product";
        // setFile({
        //     file: values.image,
        //     path: `product/${selectResponse[0].bucket_folder}`,
        // })
    }

    return (
        <>
            {console.log(gallerySections)}
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
                                    <Modal>
                                        <Modal.Content>
                                            <Text>Selecione uma cor : </Text>
                                            <Button onPress={() => handleSection(sectionColors.blue)}>Azul</Button>
                                            <Button onPress={() => handleSection(sectionColors.white)}>Branco</Button>
                                        </Modal.Content>
                                        <Modal.Button>
                                            <Text style={{ color: 'white' }}>Adicionar galeria por cor</Text>
                                        </Modal.Button>
                                    </Modal>

                                    {gallerySections &&
                                        gallerySections.map((item, index) => (
                                            <View
                                                key={index}
                                                style={styles.galleryByColor}
                                            >
                                                <GalleryInput {...item} />
                                            </View>
                                        ))}
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



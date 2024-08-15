import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Formik } from 'formik';
import { FilePlus } from 'phosphor-react-native';
import { BucketProps } from '../../../@types/product';
import { HeaderScreen } from '../../../components/HeaderScreen';
import { GalleryInput } from '../../../components/GalleryInput';
import { useFileUpload } from '../../../hooks/useFileUpload';
import { useSelect } from '../../../hooks/useSelect';
import { SectionColorsProps, sectionColors } from './sectionColors';
import { styles } from './styles';
import { AddSectionModal } from './AddSectionModal';
import { Button } from '../../../components/Button';
import { HeaderSection } from '../../../components/HeaderSection';
import { theme } from '../../../styles/theme';
import { ActivityIndicator } from 'react-native-paper';
import { useGallery } from '../../../hooks/useGallery';


export function AddImages({ route }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const productID = route.params.productID;
    const { fileUploadResponse, setFiles, setFile } = useFileUpload();
    const { handleNewSection, gallerySections, addImages, error, fillGallery } = useGallery()

    const { selectResponse, selectResponseError } = useSelect<BucketProps>({
        tableName: 'products',
        select: ['bucket_name', 'bucket_folder'],
        match: productID,
    });

    useEffect(() => {
        handleFileUploadResponse()
    }, [fileUploadResponse])

    const handleFileUploadResponse = () => {
        setIsLoading(false);

        // Navegar proseguir caso a pessoa não faça upload de imagem 
        if (!fileUploadResponse) return

        if (fileUploadResponse.error != null || 201) {
            console.log(fileUploadResponse, " - Error");
            return;
        }

        console.log(fileUploadResponse, " - Upload response ok");
        // Set Snackbar Successful and navigate to home
    }

    const handleSubmitImages = (imageValues: any) => {
        setIsLoading(true);
        const mainDirectory = "product";

        Object.keys(imageValues).forEach((currentColor) => {
            const arrImages = imageValues[currentColor];
            const bucketFolder = selectResponse[0].bucket_folder;

            setFiles({
                file: arrImages,
                path: `${mainDirectory}/${bucketFolder}/${productID}/${currentColor}`,
            })
        })
        console.log(imageValues, "Values submit");

    }

    return (
        <>
            <HeaderScreen />
            <HeaderSection>
                2º Etapa - Adicionar imagens
            </HeaderSection>
            <ScrollView style={styles.scrollViewStyle}>
                <View style={styles.formWrap}>
                    <Formik
                        initialValues={{}}
                        onSubmit={(values) => {
                            handleSubmitImages(values)
                        }} >
                        {({ handleChange, handleBlur, handleSubmit, values, }) => (
                            <>
                                <AddSectionModal
                                    addNewSection={handleNewSection}
                                />
                                <View style={styles.form}>
                                    <GalleryInput
                                        colorCode='#B4B4B3'
                                        name='Principal'
                                        slug='main'
                                    />
                                    {(gallerySections.length > 0) &&
                                        gallerySections.map((item, index) => (
                                            <View
                                                key={index}
                                                style={[styles.galleryByColor, { flexDirection: "row" }]}
                                            >
                                                <GalleryInput {...item} />
                                            </View>
                                        )
                                        )}
                                </View>
                                <View style={styles.footer}>

                                    <Button
                                        onPress={handleSubmit}
                                        text="Concluir"
                                        bgColor={theme.colors.primaryAlt}
                                        isLoading={isLoading}
                                    />
                                </View>
                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </>
    );
}
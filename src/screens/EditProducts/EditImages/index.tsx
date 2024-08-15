import React, { useEffect, useState } from 'react'
import { styles } from './styles';
import { supaDb } from '../../../services/supadb';
import { Container } from '../../../components/Layout/Container';
import { ScrollView, Text, View } from 'react-native'
import { Button } from '../../../components/Button'
import { Formik } from 'formik';
import { GalleryInput } from '../../../components/GalleryInput';
import { AddSectionModal } from '../../AddProduct/AddImages/AddSectionModal';
import { useFileUpload } from '../../../hooks/useFileUpload';
import { useGallery } from '../../../hooks/useGallery';
import { useBucket } from '../../../hooks/useBucket';
import { Avatar } from 'react-native-paper';
import { SnackBar } from '../../../components/SnackBar';

type ScreenStatusProps = "loading" | "bucketNotFound" | "bucketFound" | "error";

export function EditImages({ navigation, route }) {
    const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>("loading");
    const { bucketPath } = route.params;
    const { selectResponse, selectResponseError, filesStructure } = useBucket({
        bucketPath: bucketPath,
        selectInsideFolders: true
    });
    const [removeImages, setRemoveImages] = useState<string[]>([]);
    const { setFiles, fileUploadResponse } = useFileUpload();
    const { handleNewSection, gallerySections, addImages, error, fillGallery } = useGallery()


    const checkScreenStatus = () => {
        let status: ScreenStatusProps = "loading";

        if (selectResponseError) return status = "error"

        status = selectResponse.length == 0
            ? "bucketNotFound"
            : "bucketFound"

        return status
    }
    useEffect(() => {
        console.log(fileUploadResponse.error.statusCode, "fileUploadResponse");

    }, [fileUploadResponse])

    useEffect(() => {
        if (!filesStructure) return

        setScreenStatus(checkScreenStatus());
        fillGallery(filesStructure)

    }, [selectResponseError, filesStructure])

    const handleBack = () => {
        navigation.goBack()
    }

    const handleSubmitImages = async (values: any) => {
        const { data, error } = await supaDb
            .storage
            .from('photo')
            .remove([...removeImages])

        Object.keys(values).forEach((currentColor) => {
            const arrImages = values[currentColor];

            setFiles({
                file: arrImages,
                path: `${bucketPath}/${currentColor}`,
            })
        })
    }

    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    {/* <Avatar.Image size={120} source={} /> */}
                    <Text>Header Screen</Text>
                </View>
                <SnackBar text='Editado com sucesso' snackState={true} />
                <Container>
                    {screenStatus === "loading" && <Text>Loading...</Text>}
                    {/* {screenStatus === "bucketNotFound" && <Text>Bucket not found</Text>} */}
                    {/* {screenStatus === "bucketFound" && ( */}
                    {(
                        <>

                            <Formik
                                initialValues={{}}
                                onSubmit={(values) => {
                                    handleSubmitImages(values)
                                }}
                            >
                                {({ handleSubmit, values }) => (
                                    <>

                                        <AddSectionModal
                                            addNewSection={handleNewSection}
                                        />
                                        {(gallerySections.length > 0) &&
                                            gallerySections.map((item, index) => {
                                                return (
                                                    <View
                                                        key={index}
                                                        style={{ marginVertical: 15 }}
                                                    >
                                                        <GalleryInput
                                                            {...item}
                                                            removeDbImages={setRemoveImages}
                                                        />
                                                    </View>
                                                )
                                            }
                                            )}
                                        <Button
                                            onPress={handleSubmit}
                                            text="Concluir"
                                        />
                                    </>
                                )}
                            </Formik>
                        </>
                    )}

                    <Button
                        // onPress={handleSubmit}
                        text="SetSnack"
                    />
                </Container>
            </ScrollView>
            {/* <Button
                    onPress={handleBack}
                    text="Voltar página"
                /> */}
        </>
    )
}
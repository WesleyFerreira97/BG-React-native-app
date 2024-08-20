import React, { useEffect, useState } from 'react'
import { styles } from './styles';
import { supaDb } from '../../../services/supadb';
import { Container } from '../../../components/Layout/Container';
import { ScrollView, Text, View } from 'react-native'
import { Button } from '../../../components/Button'
import { Formik } from 'formik';
import { GalleryInput } from '../../../components/GalleryInput';
import { AddSectionModal } from '../../AddProduct/AddImages/AddSectionModal';
import { FileProps, useFileUpload } from '../../../hooks/useFileUpload';
import { useGallery } from '../../../hooks/useGallery';
import { useBucket } from '../../../hooks/useBucket';
import { Avatar } from 'react-native-paper';
import { SnackBar } from '../../../components/SnackBar';

type ScreenStatusProps = "loading" | "bucketNotFound" | "bucketFound" | "error";

export function EditImages({ navigation, route }) {
    const { bucketPath } = route.params
    const { filesStructure, selectResponse, selectResponseError } = useBucket({
        bucketPath: bucketPath,
        selectInsideFolders: true
    })
    const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>("loading")
    const { fillGallery, gallerySections, handleNewSection } = useGallery()
    const [removeImages, setRemoveImages] = useState<string[]>([])
    const { setFiles, fileUploadResponse, uploadResponseError } = useFileUpload();

    const checkScreenStatus = (): ScreenStatusProps => {
        if (selectResponseError) return "error"

        let hasBucket: ScreenStatusProps = (!selectResponse || selectResponse.length === 0)
            ? "bucketNotFound"
            : "bucketFound"

        return hasBucket
    }

    useEffect(() => {
        if (filesStructure) {
            return fillGallery(filesStructure)
        }

        setScreenStatus(checkScreenStatus())

    }, [selectResponse, selectResponseError, filesStructure])

    useEffect(() => {
        if (!fileUploadResponse || !uploadResponseError) return

        navigation.navigate('Home')
    }, [fileUploadResponse, uploadResponseError])

    const handleSubmitImages = async (values: any) => {
        const queueToUpload: FileProps[] = []

        const { data, error } = await supaDb
            .storage
            .from('photo')
            .remove([...removeImages])

        Object.keys(values).forEach((currentColor) => {
            const arrImages = values[currentColor];

            const sectionImages = {
                file: arrImages,
                path: `${bucketPath}/${currentColor}`,
            }

            queueToUpload.push(sectionImages)
        })

        setFiles(queueToUpload)
    }

    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    {/* <Avatar.Image size={120} source={} /> */}
                    <Text>Header Screen</Text>
                </View>
                {/* <SnackBar text='Editado com sucesso' snackState={true} /> */}
                <Container>
                    {screenStatus === "loading" && <Text>Loading...</Text>}
                    <Formik
                        initialValues={{}}
                        onSubmit={(values) => {
                            handleSubmitImages(values)
                        }}
                    >
                        {({ handleSubmit, values }) => (
                            <>
                                <AddSectionModal addNewSection={handleNewSection} />
                                {gallerySections &&
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
                                    })
                                }
                                <Button
                                    onPress={handleSubmit}
                                    text="Concluir"
                                />
                            </>
                        )}
                    </Formik>
                </Container>
            </ScrollView>
        </>
    )
}
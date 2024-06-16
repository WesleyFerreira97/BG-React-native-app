import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button } from '../../../components/Button'
import { useBucket } from '../../../hooks/useBucket';
import { Formik } from 'formik';
import { sectionColors, SectionColorsNames, SectionColorsProps } from '../../AddProduct/AddProductStepTwo/sectionColors';
import { AddSectionModal } from '../../AddProduct/AddProductStepTwo/AddSectionModal';
import { GalleryInput } from '../../../components/GalleryInput';
import { useFileUpload } from '../../../hooks/useFileUpload';
import { useGallery } from '../../../hooks/useGallery';
import { supaDb } from '../../../services/supadb';
import { Container } from '../../../components/Layout/Container';

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
        console.log(fileUploadResponse, "File upload response");

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
        <Container>
            {screenStatus === "loading" && <Text>Loading...</Text>}
            {/* {screenStatus === "bucketNotFound" && <Text>Bucket not found</Text>} */}
            {/* {screenStatus === "bucketFound" && ( */}
            {(
                <>
                    <ScrollView>
                        <Formik
                            initialValues={{}}
                            onSubmit={(values) => {
                                handleSubmitImages(values)
                                // console.log(values, "values submit");
                            }}
                        >
                            {({ handleSubmit, values }) => (
                                <>
                                    <AddSectionModal
                                        addNewSection={handleNewSection}
                                    />
                                    {(gallerySections.length > 0) &&
                                        gallerySections.map((item, index) => (
                                            <View
                                                key={index}
                                                style={[{ flexDirection: "row" }]}
                                            >
                                                <GalleryInput
                                                    {...item}
                                                    removeDbImages={setRemoveImages}
                                                />
                                            </View>
                                        )
                                        )}
                                    <Button
                                        onPress={handleSubmit}
                                        text="Concluir"
                                    />
                                </>
                            )}
                        </Formik>
                    </ScrollView>
                </>
            )}

            <Button
                onPress={handleBack}
                text="Voltar página"
            />
        </Container>
    )
}
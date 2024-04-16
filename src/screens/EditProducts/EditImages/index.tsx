import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button } from '../../../components/Button'
import { useBucket } from '../../../hooks/useBucket';
import { Formik } from 'formik';
import { sectionColors, SectionColorsProps } from '../../AddProduct/AddProductStepTwo/sectionColors';
import { AddSectionModal } from '../../AddProduct/AddProductStepTwo/AddSectionModal';
import { GalleryInput } from '../../../components/GalleryInput';
import { useFileUpload } from '../../../hooks/useFileUpload';

type ScreenStatusProps = "loading" | "bucketNotFound" | "bucketFound" | "error";

export function EditImages({ navigation, route }) {
    const { bucketPath } = route.params;
    const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>("loading");
    const { selectResponse, selectResponseError } = useBucket({ bucketName: bucketPath });
    const [gallerySections, setGallerySections] = useState<SectionColorsProps[] | []>([]);
    const { fileUploadResponse, setFiles, setFile } = useFileUpload();

    useEffect(() => {
        if (selectResponseError) return setScreenStatus("error");

        if (!selectResponse) return

        setScreenStatus(selectResponse.length == 0 ? "bucketNotFound" : "bucketFound")

    }, [selectResponse, selectResponseError])

    const handleSomething = () => {
        navigation.goBack()
    }

    const handleNewSection = (value: any) => {
        setGallerySections(prevState => [...prevState, value])
    }

    const handleSubmitImages = (values: any) => {

        Object.keys(values).forEach((currentColor) => {
            const arrImages = values[currentColor];

            setFiles({
                file: arrImages,
                path: `${bucketPath}/${currentColor}`,
            })
        })
    }

    return (
        <View>
            {screenStatus === "loading" && <Text>Loading...</Text>}
            {/* {screenStatus === "bucketNotFound" && <Text>Bucket not found</Text>} */}
            {/* {screenStatus === "bucketFound" && ( */}
            {(
                <>
                    {/* <Text>Bucket found</Text> */}
                    <ScrollView>
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
                                        currentGallerySections={gallerySections}
                                    />
                                    {(gallerySections.length > 0) &&
                                        gallerySections.map((item, index) => (
                                            <View
                                                key={index}
                                                style={[{ flexDirection: "row" }]}
                                            >
                                                <GalleryInput {...item} />
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
                onPress={handleSomething}
                text="Go to EditProducts"
            />
        </View>
    )
}

const ImageSections = (sectionsData: any) => {
    return (
        <View>
            <Text>ImageSections</Text>
        </View>
    )
}
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


export function AddProductStepTwo({ route }) {
    const { fileUploadResponse, setFiles } = useFileUpload();
    const [gallerySections, setGallerySections] = useState<SectionColorsProps[] | null>([sectionColors.blue]);
    const productID = route.params.productID;

    const { selectResponse, selectResponseError } = useSelect<BucketProps>({
        select: ['bucket_name', 'bucket_folder'],
        match: productID,
    });

    useEffect(() => {
        console.log(fileUploadResponse, "File Upload response");

    }, [fileUploadResponse])

    const addNewSection = useCallback((newSection: SectionColorsProps) => {
        setGallerySections(prevState => [...prevState, newSection])
    }, [gallerySections])

    const handleSubmitt = (values: any) => {
        const bucketFolder = selectResponse[0].bucket_folder;

        Object.keys(values).forEach((currentColor) => {
            const mainDirectory = "product";
            const arrImages = values[currentColor];

            setFiles({
                file: arrImages,
                path: `${mainDirectory}/${bucketFolder}/${productID}/${currentColor}`,
            })
        })
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
                        initialValues={{
                            blue: [],
                        }}

                        onSubmit={values => {
                            handleSubmitt(values)
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, }) => (
                            <>
                                <AddSectionModal
                                    addNewSection={addNewSection}
                                    currentGallerySections={gallerySections}
                                />
                                <View style={styles.form}>
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
                                        onPress={handleSubmit as () => void}
                                        text="Concluir"
                                        bgColor={theme.colors.primaryAlt}
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
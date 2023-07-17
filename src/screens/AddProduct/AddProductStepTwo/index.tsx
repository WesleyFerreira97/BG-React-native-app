import React, { useCallback, useState } from 'react';
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


export function AddProductStepTwo({ route }) {
    const [bucketFolder, setBucketFolder] = useState<string | null>(null);
    const { fileUploadResponse, setFiles, setFile } = useFileUpload();
    const [gallerySections, setGallerySections] = useState<SectionColorsProps[] | null>([sectionColors.blue]);

    const { selectResponse, selectResponseError } = useSelect<BucketProps>({
        select: ['bucket_name', 'bucket_folder'],
        match: route.params.productId,
    });

    const addNewSection = useCallback((newSection: SectionColorsProps) => {
        setGallerySections(prevState => [...prevState, newSection])
    }, [gallerySections])

    const handleSubmit = (values) => {
        console.log("Valores do submit :", values);

        const bucketFolder = selectResponse[0].bucket_folder;

        Object.keys(values).forEach((currentColor) => {
            const mainDirectory = "product";
            const arrImages = values[currentColor];

            setFiles({
                file: arrImages,
                path: `${mainDirectory}/${bucketFolder}`,
            })
        })
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
                                    {/* <Button
                                        onPress={handleSubmit as () => void}
                                    >Submit </Button> */}
                                </View>
                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </>
    );
}
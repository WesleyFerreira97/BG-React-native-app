import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useField } from 'formik';
import { ErrorForm } from '../ErrorForm';
import { SectionProps } from '../../screens/AddProduct/AddProductStepTwo/sectionColors';
import { usePublicUrl } from '../../hooks/usePublicUrl';
import { GalleryHeader } from './GalleryHeader';
import { GalleryImage } from './GalleryImage';
import { usePickImage } from '../../hooks/usePickImage';

export function GalleryInput({ slug, ...props }: SectionProps) {
    const [field, meta, helpers] = useField(slug);
    const { images: localImages, pickImage, removeImagesByIndex } = usePickImage();
    const [dbImages, setDbImages] = useState([]);

    useEffect(() => {
        setImagesToFormData(localImages);
        // console.log(fillInput);
    }, [localImages]);

    const setImagesToFormData = (galleryImages: any) => {
        helpers.setValue(galleryImages);
    }

    const fillInput = useMemo(() => {
        const allImages = [];

        props.images.forEach(item => {
            const path = `${props.bucketPath}/${slug}`
            const finalUrl = usePublicUrl(path, item.name);

            allImages.push(finalUrl["_j"]["publicUrl"])
        });

        setDbImages(allImages)
        return allImages
    }, []);

    const removeDbImage = (imageUrl: string) => {
        let remainingImages = (images) => images.filter(image => imageUrl !== image)

        const pathUrl = filterPathUrl(imageUrl);

        props.removeDbImages(prevState => [...prevState, pathUrl])
        setDbImages(prevState => remainingImages(prevState))
    }

    function filterPathUrl(url) {
        const resultado = /(product\/.*)/.exec(url);

        return resultado ? resultado[1] : '';
    }


    const hasImage = (localImages.length == 0) && (fillInput.length == 0);

    return (
        <View style={styles.container}>
            <GalleryHeader
                color={props.colorCode}
                name={props.name}
                pickImage={pickImage}
            />
            <View style={styles.galleryGrid}>
                {hasImage && (
                    <View style={styles.galleryWarning}>
                        <TouchableOpacity onPress={pickImage}>
                            <Text style={styles.galleryWarningText}>Adicione imagens</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {localImages &&
                    localImages.map((imageFile, index) => {
                        const fileImage = imageFile?._parts[0][1].uri;

                        return (
                            <GalleryImage
                                key={index}
                                image={fileImage}
                                removeImage={() => removeImagesByIndex(index)}
                            />
                        )
                    })}
                {dbImages &&
                    dbImages.map((imageUrl, index) => {
                        return (
                            <GalleryImage
                                key={index}
                                image={imageUrl}
                                removeImage={() => removeDbImage(imageUrl)}
                            />
                        )
                    })}
            </View>
            <ErrorForm meta={meta} />
        </View>
    );
}
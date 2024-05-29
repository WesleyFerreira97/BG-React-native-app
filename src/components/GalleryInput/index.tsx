import React, { useEffect, useState } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles';
import { useField } from 'formik';
import { ErrorForm } from '../ErrorForm';
import { FilePlus } from 'phosphor-react-native';
import { theme } from '../../styles/theme';
import { Modal } from '../Modal';
import { SectionColorsNames, SectionColorsProps, SectionProps, sectionColors } from '../../screens/AddProduct/AddProductStepTwo/sectionColors';
import { usePublicUrl } from '../../hooks/usePublicUrl';

type FileFormatProps = {
    uri: string,
    name: string,
    type: string,
}

type ImageInputProps = {
    name: string;
}

type GalleryHeaderProps = {
    pickImage: () => void,
    name: string,
    color: string,
}

const GalleryHeader = (props: GalleryHeaderProps) => {
    const { pickImage, color, name } = props;

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={pickImage}
            style={{
                ...styles.galleryHeader,
                backgroundColor: color
            }}>
            <View style={styles.galleryOptions}>
                <FilePlus
                    size={32}
                    style={{ marginRight: 5 }}
                    color={theme.colors.neutralAlt}
                />
                <Text style={styles.galleryTitle}>
                    Adicionar Imagem
                </Text>
            </View>
            <Text style={styles.galleryTitle}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}

export function GalleryInput({ slug, ...props }: SectionProps) {
    const [imageSrc, setImageSrc] = useState<any>([]);
    const [field, meta, helpers] = useField(slug);
    const [testImages, setTestImages] = useState<any[]>([])

    const fillInput = () => {
        const allImages = [];

        props.images.forEach(item => {
            const finalUrl = usePublicUrl(props.bucketPath, item.name);

            allImages.push(finalUrl["_j"]["publicUrl"])
        });

        setTestImages(allImages);
    }

    useEffect(() => {
        setImagesToFormData(imageSrc);
        fillInput();

    }, [imageSrc]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            // aspect: [4, 3],
            allowsMultipleSelection: true,
            quality: .3,
        });

        if (!result.canceled) {
            console.log(result);

            // addImage(result);
        }
    };

    const loadedImages = () => {

    }

    const addImagePicked = async (image: any) => {
        // const { uri } = result as unknown as ImageInfo;
        const uri = image.assets[0].uri;

        const fileExtension = uri.substring(uri.lastIndexOf(".") + 1);
        const fileName = uri.replace(/^.*[\\\/]/, "");

        let formData: any = new FormData();

        await formData.append("files", {
            uri: uri,
            name: fileName,
            type: `image/${fileExtension}`,
        })

        setImageSrc((prevState) => ([...prevState, formData]));
    }

    const setImagesToFormData = (galleryImages: any) => {
        helpers.setValue(galleryImages);
    }

    const removeImagesByIndex = (items, index: number) => {
        const remainingImages = items.filter((item, indexItems) => indexItems != index);

        setImageSrc(remainingImages);
    }

    return (
        <View style={styles.container}>
            {(testImages.length > 0) &&
                testImages.map((item, index) => {
                    return (
                        <>
                            {console.log(index)}
                            <Image
                                key={index}
                                source={item}
                                // style={styles.gridImage}
                                width={500}
                                height={500}

                            />
                        </>
                    );
                })
            }

            <GalleryHeader
                color={props.colorCode}
                name={props.name}
                pickImage={pickImage}
            />

            <View style={styles.galleryGrid}>
                {imageSrc.length == 0 && (
                    <View style={styles.galleryWarning}>
                        <TouchableOpacity onPress={pickImage}>
                            <Text style={styles.galleryWarningText}>Adicione imagens</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* {imageSrc &&
                    imageSrc.map((image, index) => {
                        const fileImage = image?._parts[0][1].uri;

                        return (
                            <Modal key={index}>
                                <Modal.Content>
                                    <View style={styles.galleryModalContent}>
                                        <Image
                                            source={{ uri: fileImage }}
                                            style={styles.gridImageFull}
                                        />
                                        <Button
                                            onPress={() => removeImagesByIndex(imageSrc, index)}
                                            mode="contained"
                                        >
                                            Remover Imagem
                                        </Button>
                                    </View>
                                </Modal.Content>

                                <Modal.Button
                                    width="33%"
                                    height={100}
                                    aspectRatio={2 / 3}
                                >
                                    <>
                                        <Image
                                            source={{ uri: fileImage }}
                                            style={styles.gridImage}
                                        />
                                        <Text> No image here</Text>
                                    </>
                                </Modal.Button>
                            </Modal>
                        )
                    })} */}
            </View>
            <ErrorForm meta={meta} />
        </View>
    );
}
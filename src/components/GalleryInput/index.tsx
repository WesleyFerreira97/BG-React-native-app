import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles';
import { useField } from 'formik';
import { ErrorForm } from '../ErrorForm';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'
import { FilePlus } from 'phosphor-react-native';
import { theme } from '../../styles/theme';
import { Modal } from '../Modal';

type FileFormatProps = {
    uri: string,
    name: string,
    type: string,
}

type ImageInputProps = {
    name: string;
}


export function GalleryInput({ name, ...props }: any) {
    const [imageSrc, setImageSrc] = useState<any>([]);
    const [field, meta, helpers] = useField(name);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            // aspect: [4, 3],
            allowsMultipleSelection: true,
            quality: .3,
        });

        if (!result.cancelled) {
            const { uri } = result as unknown as ImageInfo;

            const fileExtension = uri.substring(uri.lastIndexOf(".") + 1);
            const fileName = uri.replace(/^.*[\\\/]/, "");

            let formData: any = new FormData();

            await formData.append("files", {
                uri: uri,
                name: fileName,
                type: `image/${fileExtension}`,
            })

            setImageSrc((prevState) => ([...prevState, uri]));

        }
    };

    // Use callback detectando alteração no imageSrc e upando para o form?

    const setImagesToFormData = (galleryImages: any) => {
        // helpers.setValue(formData);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={pickImage}
                style={styles.galleryHeader}
            >
                <View style={styles.galleryOptions}>
                    <FilePlus
                        size={32}
                        style={{ marginRight: 5 }}
                        color={theme.colors.neutralAlt}
                    />
                    <Text style={styles.galleryTitle}>Editar</Text>
                </View>
                <Text style={styles.galleryTitle}>Rosa</Text>
            </TouchableOpacity>

            <View style={styles.galleryGrid}>
                {imageSrc.length == 0 && (
                    <Text>Adicione imagens</Text>
                )}

                {imageSrc &&
                    imageSrc.map((image, index) => (
                        <Modal
                            key={index}
                        >
                            <Modal.Content>
                                <Image
                                    source={{ uri: image }}
                                    style={styles.gridImageFull}
                                />
                                <Button onPress={() => console.log(index)}>
                                    Remover Imagem
                                </Button>
                                {/* 
                                        Exibir a imagem
                                        Adicionar botão de remover imagem
                                    */}
                            </Modal.Content>

                            <Modal.Button
                                width="33%"
                                height={100}
                                aspectRatio={2 / 3}
                            >
                                <Image
                                    source={{ uri: image }}
                                    style={styles.gridImage}
                                />
                            </Modal.Button>
                        </Modal>
                    ))}
            </View>
            <ErrorForm meta={meta} />
        </View>
    );
}



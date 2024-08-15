import React from 'react'
import { Modal } from '../Modal'
import { styles } from './styles'
import { Image, Text, View } from 'react-native'
import { Button } from 'react-native-paper';

type ImageProps = string | any;

type GalleryImageProps = {
    image: ImageProps;
    removeImage?: () => void;
}

export function GalleryImage({ image, removeImage }: GalleryImageProps) {

    if (!image) {
        return (<Text>Sem imagem</Text>)
    }

    return (
        <Modal>
            <Modal.Content>
                <View style={styles.galleryModalContent}>
                    <Image
                        source={{ uri: image }}
                        style={styles.gridImageFull}
                    />
                    <Button
                        onPress={() => removeImage()}
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
                        source={{ uri: image }}
                        style={styles.gridImage}
                    />
                    <Text>No image here</Text>
                </>
            </Modal.Button>
        </Modal>
    )
}


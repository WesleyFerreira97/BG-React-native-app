import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

export function usePickImage() {
    const [images, setImages] = useState([]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            // aspect: [4, 3],
            allowsMultipleSelection: true,
            quality: .3,
        });

        if (!result.canceled) addImagePicked(result);
    };

    const addImagePicked = async (image: any) => {
        const uri = image.assets[0].uri;

        const fileExtension = uri.substring(uri.lastIndexOf(".") + 1);
        const fileName = uri.replace(/^.*[\\\/]/, "");

        let formData: any = new FormData();

        await formData.append("files", {
            uri: uri,
            name: fileName,
            type: `image/${fileExtension}`,
        })

        setImages((prevState) => ([...prevState, formData]));
    }

    const removeImagesByIndex = (index: number) => {
        const remainingImages = (images) => images.filter((item, indexItems) => indexItems != index);

        setImages(prev => remainingImages(prev));
    }

    return { images, pickImage, removeImagesByIndex }
}

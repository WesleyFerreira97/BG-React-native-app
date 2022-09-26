import React, { useEffect, useState } from 'react';
import { Image, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles';
import { useField } from 'formik';
import { supaDb } from '../../services/supadb';
import { ErrorForm } from '../ErrorForm';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'

type FileFormatProps = {
    uri: string,
    name: string,
    type: string,
}

type ImageInputProps = {
    name: string;
}

export function ImageInput({ name, ...props }: any) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
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

            setImageSrc(uri);
            helpers.setValue(formData)
        }
    };

    return (
        <View style={styles.container}>
            <Button onPress={pickImage}>Image Picker</Button>

            {imageSrc && (
                <Image
                    source={{ uri: imageSrc }}
                    style={{ width: '90%', height: '60%' }}
                />
            )}

            {meta.touched && meta.error ? (
                <Text style={{ color: "red" }}>{meta.error}</Text>
            ) : null}

            <ErrorForm meta={meta} />
        </View>
    );
}
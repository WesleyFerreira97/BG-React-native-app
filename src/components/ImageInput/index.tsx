import React, { useEffect, useState } from 'react';
import { Image, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles';
import { useField } from 'formik';
import { supaDb } from '../../services/supadb';

type FileFormatProps = {
    uri: string,
    name: string,
    type: string,
}

export function ImageInput({ label, ...props }: any) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [field, meta, helpers] = useField(props);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0,
        });

        if (!result.cancelled) {
            const ext = result.uri.substring(result.uri.lastIndexOf(".") + 1);
            const fileName = result.uri.replace(/^.*[\\\/]/, "");

            let formData: any = new FormData();

            await formData.append("files", {
                uri: result.uri,
                name: fileName,
                type: `image/${ext}`,
            })

            setImageSrc(result.uri);
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

        </View>
    );
}
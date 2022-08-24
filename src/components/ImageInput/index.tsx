import React, { useEffect, useState } from 'react';
import { Image, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles';
import { useField } from 'formik';
import { supaDb } from '../../services/supadb';

export function ImageInput({ label, ...props }: any) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [field, meta, helpers] = useField(props);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            console.log(result, "base64 filho");

            setImageSrc(result.uri);
            helpers.setValue(result.uri)
        }
    };

    // useEffect(() => {
    //     if (!imageSrc) return;

    //     supaDb.storage
    //         .from("photo")
    //         .upload("public/news/image1.jpg", imageSrc)
    //         .then((res) => {
    //             console.log(res);

    //         });

    // }, [imageSrc]);

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
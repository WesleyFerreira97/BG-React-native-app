import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles';
import { useField } from 'formik';

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
            setImageSrc(result.uri);
            helpers.setValue(result.uri)
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
        </View>
    );
}
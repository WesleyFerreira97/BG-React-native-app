import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { BucketProps } from '../../../@types/product';
import { ImageInput } from '../../../components/ImageInput';
import { useFileUpload } from '../../../hooks/useFileUpload';
import { useSelect } from '../../../hooks/useSelect';

import { styles } from './styles';

export function AddProductStepTwo({ route }) {
    const { selectResponse, selectResponseError } = useSelect<BucketProps>({
        select: ['bucket_name', 'bucket_folder'],
        match: route.params.productId,
    });
    const [bucketFolder, setBucketFolder] = useState<string | null>(null);

    const { fileUploadResponse, setFile } = useFileUpload();

    const handleSubmit = (values) => {
        console.log(values);

        // const mainDirectory = "product";


        // setFile({
        //     file: values.image,
        //     path: `product/${selectResponse[0].bucket_folder}`,
        // })
    }

    return (
        <View style={styles.container}>
            {/* <ScrollView style={{ flex: 1, width: '90%', backgroundColor: 'black' }}> */}
            <Text>Step Two</Text>
            <Formik
                initialValues={{
                    blue: [],
                    green: [],
                }}
                onSubmit={values => handleSubmit(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <ImageInput
                            name="blue[0]"
                        />
                        <ImageInput
                            name="blue[1]"
                        />


                        <Button onPress={handleSubmit}>Submit</Button>
                    </View>
                )}
            </Formik>
            {/* </ScrollView> */}
        </View>
    );
}

// 1º Recebe o Id do produto
// 2º Com o Id faz uma requisição no banco e retorna o bucket folder
// 3º Cria um path para upload do arquivo com base no bucket folder e a cor selecionada
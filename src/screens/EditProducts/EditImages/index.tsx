import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Button } from '../../../components/Button'
import { useBucket } from '../../../hooks/useBucket';

type ScreenStatusProps = "loading" | "bucketNotFind" | "bucketFound" | "error";


export function EditImages({ navigation, route }) {
    const { bucketPath } = route.params;
    const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>("loading");
    const { selectResponse, selectResponseError } = useBucket({ bucketName: bucketPath });
    console.log(bucketPath, "bucketPath");

    useEffect(() => {
        if (selectResponseError) return setScreenStatus("error");
        // console.log(selectResponse, "selectResponse");

        setScreenStatus(selectResponse ? "bucketFound" : "bucketNotFind")

    }, [selectResponse, selectResponseError])

    const handleSomething = () => {
        navigation.goBack()
    }

    return (
        <View>
            {screenStatus === "loading" && <Text>Loading...</Text>}
            {screenStatus === "bucketNotFind" && <Text>Bucket not found</Text>}
            {screenStatus === "bucketFound" && <Text>Bucket found</Text>}

            <Button
                onPress={handleSomething}
                text="Go to EditProducts"
            />
        </View>
    )
}
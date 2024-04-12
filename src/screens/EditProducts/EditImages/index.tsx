import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Button } from '../../../components/Button'
import { useBucket } from '../../../hooks/useBucket';

type ScreenStatusProps = "loading" | "bucketNotFound" | "bucketFound" | "error";

export function EditImages({ navigation, route }) {
    const { bucketPath } = route.params;
    const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>("loading");
    const { selectResponse, selectResponseError } = useBucket({ bucketName: bucketPath });
    console.log(bucketPath, "bucketPath");

    useEffect(() => {
        if (selectResponseError) return setScreenStatus("error");

        if (!selectResponse) return

        setScreenStatus(selectResponse.length == 0 ? "bucketNotFound" : "bucketFound")

    }, [selectResponse, selectResponseError])

    const handleSomething = () => {
        navigation.goBack()
    }

    return (
        <View>
            {screenStatus === "loading" && <Text>Loading...</Text>}
            {screenStatus === "bucketNotFound" && <Text>Bucket not found</Text>}
            {screenStatus === "bucketFound" && (
                <>
                    <Text>Bucket found</Text>

                    {selectResponse.map((item: any) => (
                        <Text>
                            {item.name}
                        </Text>
                    ))}
                </>
            )}

            <Button
                onPress={handleSomething}
                text="Go to EditProducts"
            />
        </View>
    )
}

const ImageSections = (sectionsData: any) => {
    return (
        <View>
            <Text>ImageSections</Text>
        </View>
    )
}
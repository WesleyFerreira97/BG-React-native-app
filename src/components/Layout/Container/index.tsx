import React from 'react'
import { View } from 'react-native'
import { styles } from './style'

type ContainerProps = {
    children: React.ReactNode[]
}

export function Container({ children }: ContainerProps) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

import React, { useState } from 'react';
import { Text, TouchableOpacity, Modal as ModalNative, View } from 'react-native';
import { styles } from './styles';

type ModalProps = {
    children: React.ReactNode | null,
    label: string,
    value?: string | number,
}

export function Modal({ children, label, ...props }: ModalProps) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <ModalNative
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalContent}>
                    {children}
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text>Show Modal</Text>
                    </TouchableOpacity>
                </View>
            </ModalNative>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text>Show Modal</Text>
            </TouchableOpacity>
        </>
    );
}
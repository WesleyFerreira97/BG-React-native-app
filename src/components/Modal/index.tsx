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
                <View style={styles.modalOverlay} />
                <View style={styles.container}>
                    <View style={styles.modalWrap}>

                        <View style={styles.modalContent}>
                            {children}
                        </View>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <View style={styles.closeButton}>
                                    <Text>Fechar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ModalNative>


            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.labelContainer}
            >
                <Text style={styles.label}>
                    {label} &nbsp; {props.value}
                </Text>
            </TouchableOpacity>
        </>
    );
}
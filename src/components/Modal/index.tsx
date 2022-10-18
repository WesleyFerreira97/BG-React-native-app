import React, { createContext, useContext, useState, PropsWithChildren } from 'react';
import { Text, TouchableOpacity, Modal as ModalNative, View } from 'react-native';
import { styles } from './styles';

type ModalProps = {
    children: React.ReactNode | null,
    label: string,
    value?: string | number,
}

type ModalButtonProps = {
    label: string,
};

type ModalStateProps = {
    modalVisible: boolean,
    setModalVisible: (value: boolean) => void,
}

const initialValue = {
    modalVisible: false,
    setModalVisible: () => { }
}

const ModalState = createContext<ModalStateProps>(initialValue);

const ModalContent = ({ children }: PropsWithChildren) => {
    const { modalVisible, setModalVisible } = useContext(ModalState);


    return (
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
    )
}

const ModalButton = ({ label }: ModalButtonProps) => {
    const { modalVisible, setModalVisible } = useContext(ModalState);

    return (
        <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.labelContainer}
        >
            <Text style={styles.label}>
                {label}
                {/* &nbsp; {props.value} */}
            </Text>
        </TouchableOpacity>
    )
}

function Modal({ children }: PropsWithChildren) {
    return (
        <ModalState.Provider value={initialValue}>
            {children}
        </ModalState.Provider>
    );
}

Modal.ModalContent = ModalContent;
Modal.ModalButton = ModalButton;

export { Modal };


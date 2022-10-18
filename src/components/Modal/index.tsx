import React, { createContext, useContext, useState, PropsWithChildren, useEffect } from 'react';
import { Text, TouchableOpacity, Modal as ModalNative, View } from 'react-native';
import { styles } from './styles';

type ModalButtonProps = {
    label: string,
    imgSrc: string,
    style: any
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

const ModalButton = ({ children }: PropsWithChildren) => {
    const { modalVisible, setModalVisible } = useContext(ModalState);

    return (
        <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.labelContainer}
        >
            {children}
        </TouchableOpacity>
    )
}

function Modal({ children }: PropsWithChildren) {
    const [modalVisible, setModalVisible] = useState(initialValue.modalVisible);

    return (
        <ModalState.Provider value={{ modalVisible, setModalVisible }}>
            {children}
        </ModalState.Provider>
    );
}

Modal.Content = ModalContent;
Modal.Button = ModalButton;

export { Modal };


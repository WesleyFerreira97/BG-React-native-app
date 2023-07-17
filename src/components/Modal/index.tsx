import React, { createContext, useContext, useState, PropsWithChildren, useEffect } from 'react';
import { Text, TouchableOpacity, Modal as ModalNative, View, TouchableHighlightComponent, TouchableHighlight } from 'react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';

type ModalButtonProps = {
    width: string | number,
    height: string | number,
    aspectRatio: number,
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
                                <Text style={{ fontFamily: theme.fonts.secondary }}>Fechar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </ModalNative>
    )
}

const ModalButton = ({ children, ...props }: PropsWithChildren<Partial<ModalButtonProps>>) => {
    const { modalVisible, setModalVisible } = useContext(ModalState);

    return (
        <TouchableHighlight
            onPress={() => setModalVisible(true)}
            style={{ ...props, ...styles.modalButton, overflow: 'hidden' }}
        >
            {children}
        </TouchableHighlight>
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

import React, { useState } from 'react';
import { Text } from 'react-native';
import { Button, Portal, Provider } from 'react-native-paper';
import { Modal as ModalPaper } from 'react-native-paper';
import { styles } from './styles';

type ModalProps = {
    children: React.ReactNode | null,
    modalLabel: string,
    value?: string | number,
}

export function Modal({ children, modalLabel, ...props }: ModalProps) {
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <Provider>
            <Portal>
                <ModalPaper visible={visible} onDismiss={hideModal} contentContainerStyle={styles.container}>
                    {children}
                </ModalPaper>
            </Portal>

            <Button style={{ marginTop: 30 }} onPress={showModal}>
                <Text style={styles.modalLabel}>
                    {modalLabel}
                    &nbsp;
                    {props.value}
                </Text>
            </Button>
        </Provider>
    );
}
import React, { Dispatch, SetStateAction, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Modal } from '../../../components/Modal';
import { Text } from 'react-native';
import { Button } from '../../../components/Button';
import { Snackbar } from 'react-native-paper';
import { sectionColors } from './sectionColors';
import type { SectionColorsNames, SectionColorsProps } from './sectionColors';
import { styles } from './styleModal';
import { CurrencyNgn, FilePlus } from 'phosphor-react-native';
import { theme } from '../../../styles/theme';

type SnackBarProps = {
    state: boolean,
    text: string | null,
}

type AddSectionProps = {
    addNewSection: (prop: SectionColorsNames) => void
}

type ModalItemProps = {
    bgColor: string;
    color: string;
    label: string;
}

const ModalItem = (props: ModalItemProps) => {

    return (
        <View style={{
            ...styles.menuItem,
            backgroundColor: props.bgColor,
        }}>
            <FilePlus
                color={props.color}
                size={24}
            />
            <Text style={{
                ...styles.menuItemTitle,
                color: props.color
            }}>
                {props.label}
            </Text>
        </View>
    )
}

export function AddSectionModal({ addNewSection }: AddSectionProps) {

    const defaultSnackStatus = {
        state: false,
        text: null,
    }
    const [snackBarStatus, setSnackBarStatus] = useState<SnackBarProps>(defaultSnackStatus);
    const onDismissSnackBar = () => setSnackBarStatus(defaultSnackStatus)

    return (
        <>
            <Modal>
                <Modal.Content>
                    <View style={styles.modalContentWrap}>
                        <Text style={styles.modalTitle}>
                            Selecione uma cor
                        </Text>
                        <View style={styles.modalInnerContent}>

                            <TouchableOpacity onPress={() => addNewSection("blue")} >
                                <ModalItem
                                    bgColor={theme.colors.secondary}
                                    color={theme.colors.neutral}
                                    label='Azul'
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => addNewSection("purple")} >
                                <ModalItem
                                    bgColor={theme.colors.secondary}
                                    color={theme.colors.neutral}
                                    label='Roxo'
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => addNewSection("white")} >
                                <ModalItem
                                    bgColor={theme.colors.secondary}
                                    color={theme.colors.neutral}
                                    label='Branco'
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => addNewSection("main")} >
                                <ModalItem
                                    bgColor={theme.colors.secondary}
                                    color={theme.colors.neutral}
                                    label='Imagem Principal'
                                />
                            </TouchableOpacity>
                        </View>

                        <Snackbar
                            visible={snackBarStatus.state}
                            onDismiss={onDismissSnackBar}
                            duration={3000}
                            action={{
                                label: 'Ok'
                            }}>
                            {snackBarStatus.text}
                        </Snackbar>
                    </View>
                </Modal.Content >
                <Modal.Button>
                    <Button
                        text='Adicionar galeria por cor'
                    />
                </Modal.Button>
            </Modal >
        </>
    );
}
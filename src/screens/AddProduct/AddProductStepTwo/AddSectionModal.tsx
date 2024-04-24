import React, { Dispatch, SetStateAction, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Modal } from '../../../components/Modal';
import { Text } from 'react-native';
import { Button } from '../../../components/Button';
import { Snackbar } from 'react-native-paper';
import { sectionColors } from './sectionColors';
import type { SectionColorsProps } from './sectionColors';
import { styles } from './styleModal';
import { CurrencyNgn, FilePlus } from 'phosphor-react-native';
import { theme } from '../../../styles/theme';

type SnackBarProps = {
    state: boolean,
    text: string | null,
}

type AddSectionProps = {
    currentGallerySections: SectionColorsProps[];
    addNewSection: (prop: SectionColorsProps) => void
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

export function AddSectionModal({ currentGallerySections, addNewSection }: AddSectionProps) {

    const defaultSnackStatus = {
        state: false,
        text: null,
    }

    const [snackBarStatus, setSnackBarStatus] = useState<SnackBarProps>(defaultSnackStatus);
    const onDismissSnackBar = () => setSnackBarStatus(defaultSnackStatus)

    const handleSection = (sectionProps: SectionColorsProps) => {
        const noActiveSections = (currentGallerySections.length === 0);

        if (noActiveSections) return addNewSection(sectionProps)

        const isDuplicate = currentGallerySections.some(
            section => section.name === sectionProps.name
        );

        if (isDuplicate) return setSnackBarStatus({
            state: true,
            text: "Seção Já adicionada"
        });

        addNewSection(sectionProps);
    }

    return (
        <>
            <Modal>
                <Modal.Content>
                    <View style={styles.modalContentWrap}>
                        <Text style={styles.modalTitle}>
                            Selecione uma cor
                        </Text>
                        <View style={styles.modalInnerContent}>

                            <TouchableOpacity onPress={() => handleSection(sectionColors.white)} >
                                <ModalItem
                                    bgColor={theme.colors.secondary}
                                    color={theme.colors.neutral}
                                    label='Branco'
                                />
                            </TouchableOpacity>



                            <TouchableOpacity onPress={() => handleSection(sectionColors.blue)} >
                                <ModalItem
                                    bgColor={theme.colors.secondary}
                                    color={theme.colors.neutral}
                                    label='Azul'
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleSection(sectionColors.purple)} >
                                <ModalItem
                                    bgColor={theme.colors.secondary}
                                    color={theme.colors.neutral}
                                    label='Roxo'
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
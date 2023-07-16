import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Modal } from '../../../components/Modal';
import { Text } from 'react-native';
import { Button } from '../../../components/Button';
import { Snackbar } from 'react-native-paper';
import { sectionColors } from './sectionColors';
import type { SectionColorsProps } from './sectionColors';

type AddSectionProps = {
    handleSection: (prop: SectionColorsProps) => void
}

export function AddSectionModal({ handleSection }: AddSectionProps) {
    return (
        <>
            <Modal>

                <Modal.Content>
                    <Text>Selecione uma cor : </Text>
                    <Button
                        text='Azul'
                        onPress={() => handleSection(sectionColors.blue)}
                    />

                    <Button
                        text='Branco'
                        onPress={() => handleSection(sectionColors.white)}
                    />
                    <TouchableOpacity
                        onPress={() => handleSection(sectionColors.white)}
                    >
                        <Text>Branco Touchable Opacity</Text>
                    </TouchableOpacity>

                    <Snackbar
                        visible={snackBarStatus.state}
                        onDismiss={onDismissSnackBar}
                        duration={3000}
                        action={{
                            label: 'Ok'
                        }}>
                        {snackBarStatus.text}
                    </Snackbar>

                </Modal.Content >
                <Modal.Button>
                    {/* <Button
                                                text='Adicionar galeria por cor'
                                            /> */}
                    <Text> Adiconar galeria</Text>
                </Modal.Button>
            </Modal >
        </>
    );
}
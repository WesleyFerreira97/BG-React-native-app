import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './styles';
import { NotePencil } from 'phosphor-react-native';
import { theme } from '../../styles/theme';

export function ListItem() {
    const defaultImage = require("../../../assets/images/default.jpg");

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Image
                    source={defaultImage}
                    style={styles.thumbnail}
                />
                <Text style={styles.title}>
                    List Item
                </Text>
            </View>
            <View style={styles.editProduct}>
                <NotePencil size={28} color={theme.colors.primaryAlt} />
            </View>
        </View>
    );
}
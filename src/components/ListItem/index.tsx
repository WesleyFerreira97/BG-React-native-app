import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './styles';
import { NotePencil } from 'phosphor-react-native';
import { theme } from '../../styles/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

type ListItemProps = {
    title: string;
}

export function ListItem({ title, ...props }: ListItemProps) {
    const defaultImage = require("../../../assets/images/default.jpg");

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => console.log("oi")}
        >
            <View style={styles.innerContainer}>
                <Image
                    source={defaultImage}
                    style={styles.thumbnail}
                />
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
            <View style={styles.editProduct}>
                <NotePencil size={28} color={theme.colors.primaryAlt} />
            </View>
        </TouchableOpacity>
    );
}
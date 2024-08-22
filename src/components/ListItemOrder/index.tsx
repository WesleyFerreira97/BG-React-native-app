import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './styles';
import { Check, NotePencil, NumberCircleOne } from 'phosphor-react-native';
import { theme } from '../../styles/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

type ListItemProps = {
    title: string;
    icon?: React.ReactNode;
    itemId?: string;
    orderFulfilled: boolean
}

export function ListItemOrder({ title, ...props }: ListItemProps) {
    const defaultImage = require("../../../assets/images/default.jpg");

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.thumbnail}>
                    {props.icon}
                </View>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
            <View style={styles.editProduct}>
                {props.orderFulfilled
                    ? (<Check size={35} color="#06D001" weight='bold' />)
                    : (<NumberCircleOne size={35} color="red" weight='fill' />)
                }
                <NotePencil size={28} color={theme.colors.primaryAlt} />
            </View>
        </View>
    );
}
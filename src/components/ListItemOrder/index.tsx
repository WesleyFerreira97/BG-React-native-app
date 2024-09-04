import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './styles';
import { Check, NotePencil, NumberCircleOne } from 'phosphor-react-native';
import { theme } from '../../styles/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

type ListItemProps = {
    icon?: React.ReactNode;
    title: string;
    itemId?: string;
    orderFulfilled: boolean
}

export function ListItemOrder({ title, ...props }: ListItemProps) {
    const defaultImage = require("../../../assets/images/default.jpg");
    const navigation = useNavigation();

    const handleNavigate = (id: string) => {
        navigation.navigate('ClientOrder', { itemId: id });
    }

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
                    : (<NumberCircleOne size={30} color={theme.colors.primary} weight='fill' />)
                }
                <TouchableOpacity onPress={() => handleNavigate(props.itemId)}>
                    <NotePencil size={28} color={theme.colors.primaryAlt} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
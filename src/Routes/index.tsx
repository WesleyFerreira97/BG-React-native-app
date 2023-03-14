import React, { useRef } from 'react';
import { useTheme } from '../providers/ThemeContext';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House, List, ClipboardText, PlusCircle } from 'phosphor-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeStack } from './HomeStack';
import { AddProductStack } from './AddProductStack';
import { OrdersStack } from './OrdersStack';
import { View } from 'react-native';


const Tab = createMaterialBottomTabNavigator();

export function Routes() {
    const { theme } = useTheme();

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    tabBarColor: theme.colors.secondary,
                    tabBarLabel: "sdfsdf",

                }}
                inactiveColor={theme.colors.neutral}
                activeColor={theme.colors.neutralAlt}
                barStyle={{ backgroundColor: theme.colors.primary }}
                initialRouteName="home"
                shifting={true}
                labeled={false}
            >
                <Tab.Screen
                    name="addProduct"
                    component={AddProductStack}
                    options={{
                        tabBarColor: theme.colors.primary,
                        tabBarIcon: ({ color, focused }) => (
                            // <PlusCircle color={color} weight="regular" size={25} />
                            <MaterialCommunityIcons name="plus-circle" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="home"
                    component={HomeStack}
                    options={{
                        tabBarIcon: ({ color }) => (
                            // <House color={color} weight="regular" size={22} />
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),

                    }}
                />
                <Tab.Screen
                    name="pedidos"
                    component={OrdersStack}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <ClipboardText color={color} weight="duotone" size={22} />
                        ),
                    }}
                />
            </Tab.Navigator >
        </>
    );
}




import React, { useRef } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from '../providers/ThemeContext';

import { Home } from '../screens/Home';
import { Pedidos } from '../screens/Pedidos';
import { House, List, ClipboardText, PlusCircle } from 'phosphor-react-native';
import { AddProduct } from '../screens/AddProduct';

const Tab = createMaterialBottomTabNavigator();

export function Routes() {
    const { theme } = useTheme();

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    tabBarColor: theme.colors.secondaryAlt,
                }}
                shifting={true}
            >
                <Tab.Screen
                    name="addProduct"
                    component={AddProduct}
                    options={{
                        tabBarLabel: 'Add Product',
                        tabBarIcon: ({ color }) => (
                            <PlusCircle color={color} weight="regular" size={22} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="home"
                    component={Home}
                    options={{
                        tabBarLabel: 'Início',
                        tabBarIcon: ({ color }) => (
                            <House color={color} weight="regular" size={22} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="pedidos"
                    component={Pedidos}
                    options={{
                        tabBarLabel: 'Pedidos',
                        tabBarIcon: ({ color }) => (
                            <ClipboardText color={color} weight="duotone" size={22} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </>
    );
}


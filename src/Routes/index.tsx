import React, { useRef } from 'react';
import { useTheme } from '../providers/ThemeContext';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { House, List, ClipboardText, PlusCircle } from 'phosphor-react-native';

import { HomeStack } from './HomeStack';
import { AddProductStack } from './AddProductStack';
import { OrdersStack } from './OrdersStack';

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
                initialRouteName="home"
            >
                <Tab.Screen
                    name="addProduct"
                    component={AddProductStack}

                    options={{
                        tabBarLabel: 'Add Produto',
                        tabBarIcon: ({ color }) => (
                            <PlusCircle color={color} weight="regular" size={22} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="home"
                    component={HomeStack}
                    options={{
                        tabBarLabel: 'Início',
                        tabBarIcon: ({ color }) => (
                            <House color={color} weight="regular" size={22} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="pedidos"
                    component={OrdersStack}
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


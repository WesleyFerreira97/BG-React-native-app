import React, { useRef } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from '../providers/ThemeContext';

import { Home } from '../screens/Home';
import { Pedidos } from '../screens/Pedidos';
import { House, List, ClipboardText, PlusCircle } from 'phosphor-react-native';
import { AddProduct } from '../screens/AddProduct';
import { createStackNavigator } from '@react-navigation/stack';
import { AddProductStepTwo } from '../screens/AddProduct/AddProductStepTwo';

const Tab = createMaterialBottomTabNavigator();
const AddProductScreenStack = createStackNavigator();

const AddProductStack = () => {
    return (
        <AddProductScreenStack.Navigator
            initialRouteName="PaymentDates"
            screenOptions={{
                headerShown: false
            }}
        >
            <AddProductScreenStack.Screen name='addProductStepOne' component={AddProduct} />
            <AddProductScreenStack.Screen name='addProductStepTwo' component={AddProductStepTwo} />
        </AddProductScreenStack.Navigator>
    )
}

export function Routes() {
    const { theme } = useTheme();

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    tabBarColor: theme.colors.secondaryAlt,
                }}
                shifting={true}
                initialRouteName="addProduct"
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


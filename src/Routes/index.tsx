import React from 'react';
import { useTheme } from '../providers/ThemeContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeStack } from './HomeStack';
import { AddProductStack } from './AddProductStack';
import { OrdersStack } from './OrdersStack';

const Tab = createBottomTabNavigator();

export function Routes() {
    const { theme } = useTheme();

    return (
        <>
            <Tab.Navigator
                initialRouteName="home"
                screenOptions={({ route }) => ({
                    tabBarLabelStyle: { display: "none" },
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: theme.colors.neutral,
                    tabBarStyle: { backgroundColor: theme.colors.primary, },
                    tabBarActiveBackgroundColor: theme.colors.primaryAlt,
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = "";

                        switch (route.name) {
                            case "addProduct":
                                iconName = "plus-circle";
                                break;
                            case "home":
                                iconName = "home";
                                break;
                            case "pedidos":
                                iconName = "clipboard-edit";
                                break;
                        }

                        return <MaterialCommunityIcons name={iconName} color={color} size={size} />
                    },

                })}
            >
                <Tab.Screen name="addProduct" component={AddProductStack} />
                <Tab.Screen name="home" component={HomeStack} />
                <Tab.Screen name="pedidos" component={OrdersStack} />
            </Tab.Navigator >
        </>
    );
}

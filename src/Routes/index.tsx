import React, { useRef } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SidebarDrawer } from './SidebarDrawer';
import { useTheme } from '../hooks/ThemeContext';

import { Home } from '../screens/Home';
import { Pedidos } from '../screens/Pedidos';
import { House, List, ClipboardText } from 'phosphor-react-native';

// Imports from bottom Drawer Menu
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';

const Tab = createMaterialBottomTabNavigator();

function Routes() {
    const { theme } = useTheme();
    const bottomSheetRef = useRef<BottomSheet>(null);

    function handleOpen() {
        bottomSheetRef.current?.expand();
    }

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    tabBarColor: theme.colors.primary,
                }}

                shifting={true}
            >
                <Tab.Screen
                    name="menu"
                    component={SidebarDrawer}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            e.preventDefault();
                            handleOpen();
                        }
                    })}
                    options={{
                        tabBarLabel: 'Menu',
                        tabBarIcon: ({ color }) => (
                            <List color={color} weight="duotone" size={22} />
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
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={[1, 280]}
                backgroundStyle={styles.container}
                handleIndicatorStyle={styles.indicator}
            >

            </BottomSheet>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        borderRadius: 30,
        flex: 1,
    },
    indicator: {
        backgroundColor: 'yellow',
    }
});


export default gestureHandlerRootHOC(Routes);
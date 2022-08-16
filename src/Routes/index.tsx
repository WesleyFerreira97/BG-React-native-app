import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SidebarDrawer } from './SidebarDrawer';
import { DrawerActions } from '@react-navigation/native';
import { useTheme } from '../hooks/ThemeContext';

import { Home } from '../screens/Home';
import { Pedidos } from '../screens/Pedidos';
import { Cube } from 'phosphor-react-native';

const Tab = createMaterialBottomTabNavigator();

export function Routes() {
    const { theme } = useTheme();

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    tabBarColor: theme.colors.primary,
                }}
            >
                <Tab.Screen
                    name="Menu"
                    component={SidebarDrawer}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            e.preventDefault();
                            navigation.dispatch(DrawerActions.toggleDrawer());
                        }
                    })}
                />
                <Tab.Screen
                    name="Inicio"
                    component={Home}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color }) => (
                            <Cube color={theme.colors.neutral} weight="duotone" size={22} />
                        ),
                    }}
                />
                <Tab.Screen name="Pedidos" component={Pedidos} />
            </Tab.Navigator>
        </>
    );
}
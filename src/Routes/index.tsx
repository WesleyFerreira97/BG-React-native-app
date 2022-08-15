import { theme } from '../styles/theme';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SidebarDrawer } from './SidebarDrawer';

import { Home } from '../screens/Home';
import { Pedidos } from '../screens/Pedidos';

const Tab = createMaterialBottomTabNavigator();

export function Routes() {
    return (
        <>
            <Tab.Navigator
                barStyle={{
                    backgroundColor: theme.colors.primary,
                }}
            >
                <Tab.Screen
                    name="Menu"
                    component={Home}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            e.preventDefault();
                            console.log('Press navigation');
                            // navigation.dispatch

                        }
                    })}
                />
                <Tab.Screen name="Inicio" component={Home} />
                <Tab.Screen name="Pedidos" component={Pedidos} />
            </Tab.Navigator>
        </>
    );
}
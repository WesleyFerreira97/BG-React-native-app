import { theme } from '../styles/theme';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SidebarDrawer } from './SidebarDrawer';
import { DrawerActions } from '@react-navigation/native';

import { Home } from '../screens/Home';
import { Pedidos } from '../screens/Pedidos';

const Tab = createMaterialBottomTabNavigator();

export function Routes() {
    return (
        <>
            {/* <SidebarDrawer /> */}
            <Tab.Navigator
                barStyle={{
                    backgroundColor: theme.colors.primary,
                }}
            >
                <Tab.Screen
                    name="Menu"
                    component={SidebarDrawer}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            e.preventDefault();
                            console.log(navigation.dispatch(DrawerActions.toggleDrawer()));
                        }
                    })}
                />
                <Tab.Screen name="Inicio" component={Home} />
                <Tab.Screen name="Fodase" component={SidebarDrawer} />
                <Tab.Screen name="Pedidos" component={Pedidos} />
            </Tab.Navigator>
        </>
    );
}
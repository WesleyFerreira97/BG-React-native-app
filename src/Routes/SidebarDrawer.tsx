import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from '../screens/Home';

const Drawer = createDrawerNavigator();

export function SidebarDrawer() {
    return (
        <Drawer.Navigator initialRouteName='Home'>
            <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
    );
}
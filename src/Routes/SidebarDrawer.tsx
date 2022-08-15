import { Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from '../screens/Home';

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
    return (
        <View>
            <Text>Menu Drawer Item</Text>
        </View>
    )
}

export function SidebarDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName='Teste'
            screenOptions={{
                headerShown: false,

            }}
        >
            <Drawer.Screen name="Teste" component={DrawerMenu} />
            <Drawer.Screen name="Teste2" component={DrawerMenu} />
            <Drawer.Screen name="Teste3" component={DrawerMenu} />
        </Drawer.Navigator>
    );
}
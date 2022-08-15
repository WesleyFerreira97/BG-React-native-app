import { View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Home } from '../screens/Home';
const Tab = createMaterialBottomTabNavigator();

export function Routes() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator>
    );
}
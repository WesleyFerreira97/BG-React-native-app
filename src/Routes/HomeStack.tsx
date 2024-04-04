import { EditProducts } from "../screens/EditProducts";
import { HomeScreen } from "../screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import { EditImages } from "../screens/EditProducts/EditImages";

const Stack = createStackNavigator();

export function HomeStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }} >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen
                name="EditProduct"
                component={EditProducts}
            />
            <Stack.Screen
                name="EditImages"
                component={EditImages}
            />
        </Stack.Navigator>
    )
}
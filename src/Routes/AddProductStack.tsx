import { createStackNavigator } from "@react-navigation/stack";
import { AddProduct } from "../screens/AddProduct";
import { AddImages } from "../screens/AddProduct/AddImages";
import HomeScreen from "../screens/Home";

const Stack = createStackNavigator();

export function AddProductStack() {
    return (
        <Stack.Navigator
            initialRouteName="AddProduct"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name='AddProduct' component={AddProduct} />
            <Stack.Screen name='AddImages' component={AddImages} />
        </Stack.Navigator>
    )
}

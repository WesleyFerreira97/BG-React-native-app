import { EditProducts } from "../screens/EditProducts";
import { HomeScreen } from "../screens/Home";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen
                name="EditProduct"
                component={EditProducts}
            />
        </Stack.Navigator>
    )
}
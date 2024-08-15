import { createStackNavigator } from "@react-navigation/stack";
import { AddProduct } from "../screens/AddProduct";
import { AddImages } from "../screens/AddProduct/AddImages";

const Stack = createStackNavigator();

export function AddProductStack() {
    return (
        <Stack.Navigator
            initialRouteName="addProductStepOne"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='addProductStepOne' component={AddProduct} />
            <Stack.Screen name='addProductStepTwo' component={AddImages} />
        </Stack.Navigator>
    )
}

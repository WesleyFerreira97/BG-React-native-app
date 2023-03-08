import { createStackNavigator } from "@react-navigation/stack";
import { AddProduct } from "../screens/AddProduct";
import { AddProductStepTwo } from "../screens/AddProduct/AddProductStepTwo";

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
            <Stack.Screen name='addProductStepTwo' component={AddProductStepTwo} />
        </Stack.Navigator>
    )
}


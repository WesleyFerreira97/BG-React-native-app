import { AllOrders } from "../screens/ClientOrder";
import { ClientOrder } from "../screens/AllOrders";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export function OrdersStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AllOrders"
                component={AllOrders}
            />
            <Stack.Screen
                name="ClientOrder"
                component={ClientOrder}
            />
        </Stack.Navigator>
    )
}
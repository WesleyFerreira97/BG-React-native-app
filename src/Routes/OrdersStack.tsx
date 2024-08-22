import { AllOrders } from "../screens/AllOrders";
import { ClientOrder } from "../screens/ClientOrder";
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
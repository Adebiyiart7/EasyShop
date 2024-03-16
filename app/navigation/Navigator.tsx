import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import AddProductScreen from "../screens/AddProductScreen";
import Routes from "../config/Routes";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.home} screenOptions={options}>
        <Stack.Screen name={Routes.home} component={HomeScreen} />
        <Stack.Screen
          name={Routes.addProduct}
          component={AddProductScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";

import AddProductScreen from "../screens/AddProductScreen";
import Routes from "../config/Routes";
import TabNavigator from "./TabNavigator";
import store from "../store/store";
import useTheme from "../hooks/useTheme";

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
  const { colors } = useTheme();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={Routes.home}
          screenOptions={{
            ...options,
            headerStyle: { backgroundColor: colors.background },
            headerTitleStyle: { color: colors.text },
          }}
        >
          <Stack.Screen name={Routes.home} component={TabNavigator} />
          <Stack.Screen
            name={Routes.addProduct}
            component={AddProductScreen}
            options={{
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Navigator;

import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// LOCAL IMPORTS
import Routes from "../config/Routes";
import tabBarIcon from "./tabBarIcon";
import useTheme from "../hooks/useTheme";
import HomeScreen from "../screens/HomeScreen";
import ManageProductScreen from "../screens/ManageProductsScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { marginBottom: 6, fontSize: 11, fontWeight: "500" },
        labelPosition: "below-icon",
        tabStyle: {
          height: 57,
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        activeTintColor: colors.primary,
        iconStyle: {
          marginTop: 8,
        },
        style: { elevation: 0, height: 57 },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => tabBarIcon({ route, focused }),
      })}
    >
      <Tab.Screen name={Routes.home} component={HomeScreen} />
      <Tab.Screen
        name={Routes.manageProducts}
        component={ManageProductScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

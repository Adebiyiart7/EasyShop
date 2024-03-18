import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppPressable from "./AppPressable";
import Sizes from "../config/Sizes";
import useTheme from "../hooks/useTheme";

const Fab = React.memo(() => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <AppPressable
      onPress={() => {
        navigation.navigate("Add Product");
      }}
      style={[styles.fab, { backgroundColor: colors.primary }]}
    >
      <MaterialCommunityIcons
        name="plus"
        size={Sizes.xl}
        color={colors.white}
      />
    </AppPressable>
  );
});

export default Fab;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    width: 55,
    borderRadius: Sizes.sm,
  },
});

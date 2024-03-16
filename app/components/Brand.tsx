import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Sizes from "../config/Sizes";
import useTheme from "../hooks/useTheme";

const Brand = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="shopping" color={colors.text} size={25} />
      <AppText style={styles.text}>Easy Shop</AppText>
    </View>
  );
};

export default Brand;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.xs,
  },
  text: {
    fontWeight: "700",
    fontSize: Sizes.xl,
  },
});

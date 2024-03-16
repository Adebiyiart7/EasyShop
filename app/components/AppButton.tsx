import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

import AppText from "./AppText";
import useTheme from "../hooks/useTheme";

interface Props {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const AppButton = ({ title, onPress, style }: Props) => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { backgroundColor: colors.primary }, style]}
    >
      <AppText color={colors.white} style={styles.text}>
        {title}
      </AppText>
    </Pressable>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  text: {
    textAlign: "center",
    fontWeight: "500",
  },
});

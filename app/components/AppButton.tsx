import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import AppText from "./AppText";
import useTheme from "../hooks/useTheme";
import Sizes from "../config/Sizes";
import AppPressable from "./AppPressable";

interface Props {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const AppButton = React.memo(({ title, onPress, style }: Props) => {
  const { colors } = useTheme();

  return (
    <AppPressable
      onPress={onPress}
      style={[styles.button, { backgroundColor: colors.primary }, style]}
    >
      <AppText color={colors.white} style={styles.text}>
        {title}
      </AppText>
    </AppPressable>
  );
});

export default AppButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: Sizes.generalBorderRadius,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  text: {
    textAlign: "center",
    fontWeight: "500",
  },
});

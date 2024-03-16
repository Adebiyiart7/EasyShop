import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import AppText from "./AppText";
import Sizes from "../config/Sizes";
import useTheme from "../hooks/useTheme";

interface Props {
  active: boolean;
  text: string;
  onPress: () => void;
}

const Chip = ({ active, text, onPress }: Props) => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          borderColor: active ? colors.primary : colors.border,
          backgroundColor: active ? colors.primary : colors.background200,
        },
      ]}
    >
      <AppText style={styles.text} color={active ? colors.white : colors.text}>
        {text}
      </AppText>
    </Pressable>
  );
};

export default Chip;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    paddingHorizontal: Sizes.md,
    borderRadius: 8,
  },
  text: { fontWeight: "500" },
});

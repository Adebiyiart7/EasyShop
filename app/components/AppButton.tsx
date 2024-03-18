import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import AppText from "./AppText";
import useTheme from "../hooks/useTheme";
import Sizes from "../config/Sizes";
import AppPressable from "./AppPressable";

interface Props {
  small?: boolean;
  title: string | ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  secondary?: boolean;
}

const AppButton = React.memo(
  ({ small, title, onPress, style, disabled, secondary }: Props) => {
    const { colors } = useTheme();

    return (
      <AppPressable
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.button,
          {
            backgroundColor: secondary ? colors.background200 : colors.primary,
            opacity: disabled ? 0.4 : 1,
            height: small ? 45 : 55,
          },
          style,
        ]}
      >
        {typeof "string" ? (
          <AppText
            color={secondary ? colors.primary : colors.white}
            style={styles.text}
          >
            {title}
          </AppText>
        ) : (
          title
        )}
      </AppPressable>
    );
  }
);

export default AppButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: Sizes.generalBorderRadius,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
  text: {
    textAlign: "center",
    fontWeight: "500",
  },
});

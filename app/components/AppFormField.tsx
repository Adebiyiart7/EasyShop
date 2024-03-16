import {
  StyleSheet,
  TextInput,
  Pressable,
  StyleProp,
  TextStyle,
  TextInputProps,
} from "react-native";
import React, { useState } from "react";

// LOCAL IMPORTS
import Sizes from "./../config/Sizes";
import AppText from "./AppText";
import useTheme from "../hooks/useTheme";
import ErrorMessage from "./ErrorMessage";

interface Props {
  error?: string;
  label: string;
  required?: boolean;
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
  otherProps?: TextInputProps;
}

const AppFormField = React.memo(
  ({ error, onPress, style, label, otherProps, required = true }: Props) => {
    const [isFocus, setIsFocus] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const { colors } = useTheme();

    const textInputStyle = {
      paddingVertical: 8,
      paddingRight: 8,
      borderColor: isFocus ? colors.primary : colors.border,
      borderWidth: isFocus ? 2 : 1,
    };

    const textInputTheme = {
      color: colors.text,
      backgroundColor: colors.background200,
    };

    return (
      <Pressable onPress={onPress} style={styles.container}>
        {(isFocus || isActive) && (
          <AppText
            style={[styles.label, { backgroundColor: colors.background }]}
            color={colors.primary}
          >
            {`${label} ${required ? "*" : ""}`}
          </AppText>
        )}

        <TextInput
          style={[
            styles.textInput,
            textInputTheme,
            { paddingHorizontal: 16 },
            textInputStyle,
            style,
          ]}
          cursorColor={colors.primary}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
          textAlign="left"
          {...otherProps}
          placeholderTextColor={colors.mediumText}
        />
        <ErrorMessage visible={true} error={error} />
      </Pressable>
    );
  }
);

export default AppFormField;

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },
  label: {
    position: "absolute",
    top: -12,
    left: 12,
    zIndex: 1,
    fontWeight: "500",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  textInput: {
    borderRadius: Sizes.generalBorderRadius,
    height: 55,
    fontSize: Sizes.md,
  },
});

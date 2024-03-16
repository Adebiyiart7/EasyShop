import { StyleSheet, Text, useColorScheme } from "react-native";
import React from "react";
import useTheme from "../hooks/useTheme";

interface ErrorMessageProps {
  visible: boolean;
  error: string;
}

const ErrorMessage = React.memo(({ visible, error }: ErrorMessageProps) => {
  const { colors } = useTheme();

  if (!visible || !error) return null;
  return <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>;
});

export default ErrorMessage;

const styles = StyleSheet.create({
  error: {
    marginTop: 3,
  },
});

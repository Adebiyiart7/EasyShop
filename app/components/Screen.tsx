import React, { ReactNode } from "react";
import { SafeAreaView, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import useTheme from "../hooks/useTheme";

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Screen = React.memo(({ children, style }: Props) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={[
        styles.screen,
        { backgroundColor: theme.colors.background },
        style,
      ]}
    >
      <StatusBar style="dark" backgroundColor={theme.colors.background} />
      {children}
    </SafeAreaView>
  );
});

export default Screen;

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});

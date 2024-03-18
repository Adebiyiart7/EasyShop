import React from "react";
import { Ionicons } from "@expo/vector-icons";
import AppPressable from "../components/AppPressable";
import { StyleSheet, Animated } from "react-native";
import useZoomIn from "../hooks/useZoomIn";
import useTheme from "../hooks/useTheme";

const HomeHeaderRight = React.memo(() => {
  const scale = useZoomIn();
  const { dark, setColorScheme } = useTheme();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      {dark ? (
        <AppPressable
          opacity={0.5}
          scale={0.9}
          onPress={() => {
            setColorScheme("light");
          }}
        >
          <Ionicons name="sunny-outline" size={28} />
        </AppPressable>
      ) : (
        <AppPressable
          opacity={0.5}
          scale={0.9}
          onPress={() => {
            setColorScheme("dark");
          }}
        >
          <Ionicons name="moon" size={28} />
        </AppPressable>
      )}
    </Animated.View>
  );
});

export default HomeHeaderRight;

const styles = StyleSheet.create({});

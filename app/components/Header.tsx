import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import Sizes from "../config/Sizes";

interface Props {
  Left?: ReactNode;
  Right?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Header = React.memo(({ Left, Right, style }: Props) => {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.left}>{Left}</View>
      <View style={styles.right}>{Right}</View>
    </View>
  );
});

export default Header;

const styles = StyleSheet.create({
  header: {
    padding: Sizes.wall,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {},
  right: {},
});

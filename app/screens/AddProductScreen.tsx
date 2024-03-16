import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import AppPressable from "../components/AppPressable";
import AppText from "../components/AppText";

const AddProductScreen = () => {
  return (
    <Screen style={{ paddingTop: 0 }}>
      <AppPressable style={style}>
        <AppText>Add Image</AppText>
      </AppPressable>
    </Screen>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({});

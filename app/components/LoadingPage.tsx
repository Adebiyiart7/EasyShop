import { ActivityIndicator } from "react-native";
import React from "react";

import Screen from "./Screen";

const LoadingPage = () => {
  return (
    <Screen style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </Screen>
  );
};

export default LoadingPage;

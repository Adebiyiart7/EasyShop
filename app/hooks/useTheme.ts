import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import { DarkTheme, LightTheme } from "../config/theme";

const useTheme = () => {
  const [mode, setMode] = useState(DarkTheme);
  const [colorScheme, setColorScheme] = useState(useColorScheme());

  useEffect(() => {
    setMode(colorScheme === "dark" ? DarkTheme : LightTheme);
  }, [colorScheme]);

  const theme = {
    ...mode,
    setColorScheme: setColorScheme,
  };
  return theme;
};

export default useTheme;

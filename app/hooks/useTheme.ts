import { useEffect, useState } from "react";
import { DarkTheme, LightTheme } from "../config/theme";
import { useColorScheme } from "react-native";

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

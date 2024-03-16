import { DarkTheme, LightTheme } from "../config/theme";
import { useColorScheme } from "react-native";

const useTheme = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

  return theme;
};

export default useTheme;

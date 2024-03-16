import { Animated, StyleSheet } from "react-native";
import AppPressable from "./AppPressable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Sizes from "../config/Sizes";
import useTheme from "../hooks/useTheme";
import useZoomIn from "../hooks/useZoomIn";
import { useNavigation } from "@react-navigation/native";

const Fab = () => {
  const { colors } = useTheme();
  const scale = useZoomIn();
  const navigation = useNavigation();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <AppPressable
        onPress={() => {
          navigation.navigate("Add Product");
        }}
        style={[styles.fab, { backgroundColor: colors.primary }]}
      >
        <MaterialCommunityIcons
          name="plus"
          size={Sizes.xl}
          color={colors.white}
        />
      </AppPressable>
    </Animated.View>
  );
};

export default Fab;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    width: 55,
    borderRadius: Sizes.sm,
  },
});

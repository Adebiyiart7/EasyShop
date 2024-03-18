import { Ionicons } from "@expo/vector-icons";

// LOCAL IMPORTS
import Routes from "../config/Routes";
import useTheme from "../hooks/useTheme";
import { RouteProp } from "@react-navigation/native";

interface Props {
  route: RouteProp<Record<string, object>, string>;
  focused?: boolean;
}

const tabBarIcon = ({ route, focused }: Props) => {
  const { colors } = useTheme();
  let iconName: React.ComponentProps<typeof Ionicons>["name"];

  if (route?.name === Routes.home) {
    iconName = focused ? "home" : "home-outline";
  } else if (route?.name === Routes.manageProducts) {
    iconName = focused ? "settings" : "settings-outline";
  }

  return (
    <Ionicons
      name={iconName}
      color={focused ? colors.primary : colors.mediumText}
      size={24}
    />
  );
};

export default tabBarIcon;

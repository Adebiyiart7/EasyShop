import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigator from "./app/navigation/Navigator";

export default function App() {
  // GENERATE UNIQUE ID FOR USER
  const generateUserId = async () => {
    await AsyncStorage.getItem("userId").then(async (value) => {
      if (!value) {
        await AsyncStorage.setItem(
          "userId",
          Math.random().toString().slice(2, 12)
        );
      }
    });
  };

  generateUserId();
  return <Navigator />;
}

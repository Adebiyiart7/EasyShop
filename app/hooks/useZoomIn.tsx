import { useEffect, useRef } from "react";
import { Animated } from "react-native";

const useZoomIn = (duration = 500) => {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [duration, scale]);

  return scale;
};

export default useZoomIn;

import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  opacity?: number;
  scale?: number;
  onPress: () => void;
}

const AppPressable = React.memo(
  ({ children, style, opacity, scale, onPress }: Props) => {
    return (
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <View
            style={[
              {
                opacity: pressed ? opacity || 0.9 : 1,
                transform: [{ scale: pressed ? scale || 0.99 : 1 }],
              },
              style,
            ]}
          >
            {children}
          </View>
        )}
      </Pressable>
    );
  }
);

export default AppPressable;

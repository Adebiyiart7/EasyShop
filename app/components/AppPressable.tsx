import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  opacity?: number;
  scale?: number;
  disabled?: boolean;
  onPress: () => void;
}

const AppPressable = React.memo(
  ({ children, style, opacity, scale, onPress, disabled = false }: Props) => {
    return (
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <View
            style={[
              {
                opacity: !disabled ? (pressed ? opacity || 0.9 : 1) : 0.9,
                transform: [
                  { scale: !disabled ? (pressed ? scale || 0.99 : 1) : 0.99 },
                ],
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

import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ProductProps } from "../screens/HomeScreen";
import AppText from "./AppText";
import Sizes from "../config/Sizes";
import useTheme from "../hooks/useTheme";
import { API_URL } from "../config/env";
import AppButton from "./AppButton";

const { width: screenWidth } = Dimensions.get("window");

interface Props {
  isList?: boolean;
  showManageButtons?: boolean;
  product: ProductProps;
  onPressUpdate?: () => void;
  onPressDelete?: () => void;
}

const ProductCard = React.memo(
  ({
    isList,
    showManageButtons,
    product,
    onPressDelete,
    onPressUpdate,
  }: Props) => {
    const { colors } = useTheme();
    const imageWidth = (screenWidth - 3 * Sizes.wall) / (isList ? 2.3 : 2);

    return (
      <View
        style={[
          styles.container,
          {
            flexDirection: isList ? "row" : "column",
            gap: isList ? Sizes.md : 10,
          },
        ]}
      >
        <Image
          source={{ uri: API_URL + product.image }}
          style={[
            styles.image,
            { backgroundColor: colors.background200, height: imageWidth },
          ]}
          resizeMode="contain"
        />
        <View style={styles.detail}>
          <View>
            <AppText
              style={[styles.text, { width: imageWidth }]}
              numberOfLines={1}
            >
              {product.name}
            </AppText>
            <AppText style={styles.price} numberOfLines={1}>
              {typeof product.price === "number"
                ? product.price.toLocaleString()
                : product.price}
            </AppText>
          </View>
          {showManageButtons && (
            <View style={styles.buttons}>
              <View style={{ flex: 1 }}>
                <AppButton
                  small
                  secondary
                  style={{ elevation: 1 }}
                  title="Update"
                  onPress={onPressUpdate}
                />
              </View>
              <View style={{ flex: 1 }}>
                <AppButton
                  small
                  title="Delete"
                  style={{ backgroundColor: colors.danger, elevation: 1 }}
                  onPress={onPressDelete}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
);

export default ProductCard;

const styles = StyleSheet.create({
  buttons: { flexDirection: "row", gap: Sizes.base },
  container: {
    marginBottom: Sizes.wall,
  },
  detail: {
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    aspectRatio: 1,
    borderRadius: Sizes.md,
  },
  price: { fontWeight: "800", fontSize: 20 },
  text: {
    fontWeight: "600",
    fontSize: 18,
  },
});

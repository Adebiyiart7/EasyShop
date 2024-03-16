import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ProductProps } from "../screens/HomeScreen";
import AppText from "./AppText";
import Sizes from "../config/Sizes";
import useTheme from "../hooks/useTheme";
import { API_URL } from "../config/env";

const { width: screenWidth } = Dimensions.get("window");
const imageWidth = (screenWidth - 3 * Sizes.wall) / 2;

interface Props {
  product: ProductProps;
}

const ProductCard = React.memo(({ product }: Props) => {
  const { colors } = useTheme();

  return (
    <View>
      <Image
        source={{ uri: API_URL + product.image }}
        style={[styles.image, { backgroundColor: colors.background200 }]}
        resizeMode="contain"
      />
      <View style={styles.detail}>
        <AppText style={styles.text} numberOfLines={1}>
          {product.name}
        </AppText>
        <AppText style={styles.price} numberOfLines={1}>
          {product.price.toLocaleString()}
        </AppText>
      </View>
    </View>
  );
});

export default ProductCard;

const styles = StyleSheet.create({
  detail: {
    marginTop: 10,
    marginBottom: Sizes.wall,
  },
  image: {
    aspectRatio: 1,
    height: imageWidth,
    borderRadius: Sizes.md,
  },
  price: { fontWeight: "800", fontSize: 20 },
  text: {
    width: imageWidth,
    fontWeight: "600",
    fontSize: Sizes.md,
  },
});

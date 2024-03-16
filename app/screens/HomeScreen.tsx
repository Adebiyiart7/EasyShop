import React, { useEffect, useState } from "react";
import {
  Pressable,
  FlatList,
  View,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import Screen from "../components/Screen";
import useTheme from "../hooks/useTheme";
import AppText from "../components/AppText";
import Header from "../components/Header";
import Brand from "../components/Brand";
import Chip from "../components/Chip";
import Sizes from "../config/Sizes";
import ProductCard from "../components/ProductCard";
import Fab from "../components/Fab";

interface CategoryProps {
  id: number;
  name: string;
}

export interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: any;
}

const category: CategoryProps[] = [
  { id: 1, name: "All" },
  { id: 2, name: "Shoes" },
  { id: 3, name: "Bags" },
  { id: 4, name: "Clothes" },
  { id: 5, name: "Stationery" },
];

const products: ProductProps[] = [
  {
    id: 1,
    name: "Snicker",
    price: 20000,
    image: require("../assets/dog.jpg"),
  },
  {
    id: 2,
    name: "Leather Bag make the text longer",
    price: 20000,
    image: require("../assets/dog.jpg"),
  },
  {
    id: 3,
    name: "Jacket",
    price: 20000,
    image: require("../assets/dog.jpg"),
  },
  { id: 4, name: "Jean", price: 20000, image: require("../assets/dog.jpg") },
  { id: 5, name: "Cap", price: 20000, image: require("../assets/dog.jpg") },
];

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState(category[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [loading]);

  if (loading) {
    return (
      <Screen style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </Screen>
    );
  }

  return (
    <Screen>
      <Header Left={<Brand />} style={{ paddingBottom: Sizes.xs }} />
      <FlatList
        numColumns={2}
        data={products}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: Sizes.wall }}
        style={styles.content}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListHeaderComponent={
          <FlatList
            horizontal
            data={category}
            renderItem={({ item }) => (
              <Chip
                active={activeCategory.id === item.id}
                onPress={() => {
                  setActiveCategory(item);
                }}
                text={item.name}
              />
            )}
            style={styles.categories}
            contentContainerStyle={{ gap: 10, marginTop: 4 }}
            showsHorizontalScrollIndicator={false}
          />
        }
        ListFooterComponent={<View style={{ height: 60 }} />}
      />
      <Fab />
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  categories: {
    marginBottom: Sizes.lg,
  },
  content: {
    width: "100%",
    paddingTop: Sizes.xs,
    paddingHorizontal: Sizes.wall,
  },
});

import React, { useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import Header from "../components/Header";
import Brand from "../components/Brand";
import Chip from "../components/Chip";
import Sizes from "../config/Sizes";
import ProductCard from "../components/ProductCard";
import Fab from "../components/Fab";
import { useQuery } from "react-query";
import axios from "axios";
import { API_URL } from "../config/env";
import AppText from "../components/AppText";
import useTheme from "../hooks/useTheme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface CategoryProps {
  id: number;
  name: string;
}

export interface ProductProps {
  userId?: string;
  _id: number;
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

// const products: ProductProps[] = [
//   {
//     _id: 1,
//     name: "Snicker",
//     price: 20000,
//     image: require("../assets/dog.jpg"),
//   },
//   {
//     _id: 2,
//     name: "Leather Bag make the text longer",
//     price: 20000,
//     image: require("../assets/dog.jpg"),
//   },
//   {
//     _id: 3,
//     name: "Jacket",
//     price: 20000,
//     image: require("../assets/dog.jpg"),
//   },
//   { _id: 4, name: "Jean", price: 20000, image: require("../assets/dog.jpg") },
//   { _id: 5, name: "Cap", price: 20000, image: require("../assets/dog.jpg") },
// ];

const HomeScreen = () => {
  const { colors } = useTheme();
  const [activeCategory, setActiveCategory] = useState(category[0]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      await axios
        .get(API_URL + "products?userId=123")
        .then((res) => setProducts(res.data.body))
        .catch((error) => {
          console.log(error.message);
        });
    };

    fetchProducts();
  }, []);

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
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: Sizes.wall }}
        style={styles.content}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListHeaderComponent={
          <>
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
            {products.length === 0 && (
              <AppText style={styles.noProdMessage} color={colors.mediumText}>
                No Products!
              </AppText>
            )}
          </>
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
  noProdMessage: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: Sizes.md,
    marginTop: 100,
  },
});

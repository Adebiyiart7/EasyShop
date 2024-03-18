import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import Header from "../components/Header";
import Brand from "../components/Brand";
import Chip from "../components/Chip";
import Sizes from "../config/Sizes";
import ProductCard from "../components/ProductCard";
import Fab from "../components/Fab";
import AppText from "../components/AppText";
import useTheme from "../hooks/useTheme";
import useZoomIn from "../hooks/useZoomIn";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";
import LoadingPage from "../components/LoadingPage";
import HomeHeaderRight from "../components/HomeHeaderRight";

interface CategoryProps {
  id: number;
  name: string;
}

export interface ProductProps {
  userId?: string;
  _id: string;
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

const HomeScreen = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState(category[0]);
  const { isLoading, products } = useSelector(
    (state: { product: any }) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts("123") as any);
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <Screen>
      <Header
        Left={<Brand />}
        style={{ paddingBottom: Sizes.xs }}
        // Right={<HomeHeaderRight />}
      />
      <FlatList
        numColumns={2}
        data={products}
        keyExtractor={(item) => item._id}
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

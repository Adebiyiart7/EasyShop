import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import Header from "../components/Header";
import Sizes from "../config/Sizes";
import ProductCard from "../components/ProductCard";
import AppText from "../components/AppText";
import useTheme from "../hooks/useTheme";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../features/product/productSlice";
import LoadingPage from "../components/LoadingPage";
import BottomSheet from "../components/BottomSheet";
import DeleteWarning from "../components/DeleteWarning";
import UpdateProductContent from "../components/UpdateProductContent";

const ManageProductScreen = () => {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState("");
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);

  const { isLoading, products } = useSelector(
    (state: { product: any }) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts("123") as any);
  }, []);

  const handleUpdate = () => {};

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id) as any).then((res: any) => {
      console.log(res.payload.body);
      if (res.payload.body) {
        setDeleteVisible(false);
        dispatch(fetchProducts("123") as any); // refetch data
      }
    });
  };

  if (isLoading) return <LoadingPage />;

  return (
    <Screen>
      <BottomSheet
        bottomSheetContent={
          <DeleteWarning
            setBottomSheetVisible={setDeleteVisible}
            handleDelete={() => handleDelete(productId)}
          />
        }
        bottomSheetVisible={deleteVisible}
        setBottomSheetVisible={setDeleteVisible}
      />
      <BottomSheet
        bottomSheetContent={<UpdateProductContent />}
        bottomSheetVisible={updateVisible}
        setBottomSheetVisible={setUpdateVisible}
      />
      <Header
        Left={
          <AppText style={{ fontWeight: "700", fontSize: 22 }}>
            Manage Products
          </AppText>
        }
        style={{ paddingBottom: Sizes.xs }}
      />
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        style={styles.content}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            isList
            showManageButtons
            onPressDelete={() => {
              setDeleteVisible(true);
              setProductId(item._id);
            }}
            onPressUpdate={() => setUpdateVisible(true)}
          />
        )}
        ListFooterComponent={<View style={{ height: 60 }} />}
      />
    </Screen>
  );
};

export default ManageProductScreen;

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

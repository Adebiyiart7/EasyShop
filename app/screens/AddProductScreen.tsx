import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";

import Screen from "../components/Screen";
import Sizes from "../config/Sizes";
import AppFormField from "../components/AppFormField";
import AppButton from "../components/AppButton";
import AddProductImage from "../components/AddProductImage";
import Routes from "../config/Routes";
import {
  addProduct,
  fetchProducts,
  reset,
  updateProduct,
} from "../features/product/productSlice";
import usePushNotifications from "../hooks/usePushNotifications";
import useTheme from "../hooks/useTheme";
import { ProductProps } from "./HomeScreen";
import { API_URL } from "../config/env";
import useUser from "../hooks/useUser";

interface OnChangeProps {
  value: string;
  name: string;
}

const AddProductScreen = ({ route }) => {
  const { userId } = useUser();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(true);
  const productId = route.params?.productId || null;
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [imageError, setImageError] = useState("");
  const { products } = useSelector((state: { product: any }) => state.product);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
  });

  const { scheduleNotification: hasFiveProducts } = usePushNotifications({
    title: "Limit Exceeded!",
    body: "You cannot add more than 5 products!",
  });

  const { scheduleNotification: isTheFifthProduct } = usePushNotifications({
    title: "Limit Warning!",
    body: "The maximum number of products you can add is 5!",
  });

  useLayoutEffect(() => {
    if (productId) {
      const product: ProductProps = products.find(
        (p: ProductProps) => p._id === productId
      );

      navigation.setOptions({ title: "Update Product" });
      setProductData({ name: product.name, price: product.price.toString() });
      setImage(API_URL + product.image);
    }
  }, []);

  useEffect(() => {
    if (!image || !productData.name || !productData.price) {
      setError(true);
    } else {
      setError(false);
    }
  }, [image, productData]);

  useEffect(() => {
    if (image) {
      setImageError("");
    }
  }, [image]);

  // Simple validate
  const validate = () => {
    if (!productData.name) {
      setNameError("Name is a required field!");
    } else {
      setNameError("");
    }
    if (!productData.price) {
      setPriceError("Price is a required field!");
    } else {
      setPriceError("");
    }
    if (!image) {
      setImageError("Image is a required!");
    }
  };

  // Handle input fields
  const handleOnChangeText = ({ value, name }: OnChangeProps) => {
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUploadProduct = async () => {
    validate();
    setIsLoading(true);

    // IF PRODUCTS ARE UP TO 5 SEND NOTIFICATION
    if (!productId) {
      if (products.length >= 5) {
        hasFiveProducts();
        setTimeout(() => {
          setIsLoading(false);
          navigation.navigate(Routes.home);
        }, 1500);
        return; // Stop UploadProduct function
      }
    }

    // Upload image if no error is found
    if (!imageError && !nameError && !priceError) {
      const formData = new FormData();

      formData.append("userId", userId);
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("image", {
        uri: image,
        type: "image/jpeg",
        name: "image.jpg",
      } as any);
      // console.log(productId);
      // Add product and navigate back home
      {
        !productId
          ? dispatch(addProduct(formData) as any).then((res: any) => {
              if (products.length >= 4) {
                isTheFifthProduct();
              }
              setTimeout(() => {
                setIsLoading(false);
                navigation.navigate(Routes.home);
              }, 1500);
            })
          : dispatch(
              updateProduct({ id: productId, product: formData }) as any
            ).then((res: any) => {
              // console.log(res.payload.body);
              setIsLoading(false);
              navigation.navigate(Routes.manageProducts);
              dispatch(fetchProducts(userId) as any); // refetch data
            });
      }
      dispatch(reset());
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Screen style={{ paddingTop: 0 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <AddProductImage image={image} error={imageError} setImage={setImage} />
        <View style={styles.wrapper}>
          <AppFormField
            error={nameError}
            label="Name"
            otherProps={{
              placeholder: "Name",
              value: productData.name,
              onBlur: () => {
                if (productData.name) {
                  setNameError("");
                }
              },
              onChangeText: (value) =>
                handleOnChangeText({ value, name: "name" }),
            }}
          />
        </View>
        <View style={styles.wrapper}>
          <AppFormField
            error={priceError}
            label="Price"
            otherProps={{
              placeholder: "Price",
              keyboardType: "numeric",
              value: productData.price,
              onBlur: () => {
                if (productData.price) {
                  setPriceError("");
                }
              },
              onChangeText: (value) =>
                handleOnChangeText({ value, name: "price" }),
            }}
          />
        </View>
        <View style={{ height: Sizes.wall * 2 }} />
      </ScrollView>
      <View style={{ margin: Sizes.wall, marginTop: "auto" }}>
        <AppButton
          disabled={error}
          title={
            !isLoading ? (
              productId ? (
                "Update"
              ) : (
                "Add"
              )
            ) : (
              <ActivityIndicator color={colors.white} />
            )
          }
          onPress={() => (isLoading || error ? {} : handleUploadProduct())}
          style={{ marginTop: Sizes.wall }}
        />
      </View>
    </Screen>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Sizes.wall,
    paddingHorizontal: Sizes.wall,
  },
  wrapper: { marginTop: Sizes.xl },
});

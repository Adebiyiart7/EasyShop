import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import Screen from "../components/Screen";
import Sizes from "../config/Sizes";
import AppFormField from "../components/AppFormField";
import AppButton from "../components/AppButton";
import AddProductImage from "../components/AddProductImage";
import { API_URL } from "../config/env";
import { useNavigation } from "@react-navigation/native";
import Routes from "../config/Routes";

interface OnChangeProps {
  value: string;
  name: string;
}

const AddProductScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [imageError, setImageError] = useState("");
  const [productData, setProductData] = useState({
    name: "Cap",
    price: "40000",
  });

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

    // Upload image if no error is found
    if (!imageError && !nameError && !priceError) {
      const formData = new FormData();

      formData.append("userId", "123");
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("image", {
        uri: image,
        type: "image/jpeg",
        name: "image.jpg",
      } as any);

      await axios
        .post(API_URL + "products/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => navigation.navigate(Routes.home))
        .catch((error) => console.log(error.message));
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
          title="Add"
          onPress={handleUploadProduct}
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

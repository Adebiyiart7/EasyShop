import React from "react";
import { Image, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import useTheme from "../hooks/useTheme";
import AppPressable from "./AppPressable";
import mediaPermission from "../utilities/mediaPermission";
import Sizes from "../config/Sizes";
import AppText from "./AppText";
import ErrorMessage from "./ErrorMessage";

interface Props {
  error?: string;
  image: any;
  setImage: (value: any) => void;
  setImageFile: (value: File) => void;
}

const AddProductImage = ({ error, image, setImage, setImageFile }: Props) => {
  const { colors } = useTheme();

  // Pick single image
  const pickImage = async () => {
    await mediaPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      allowsEditing: true,
    });

    const asset = result?.assets[0];
    console.log(asset);
    if (!result.canceled) {
      setImage(asset as any);

      // Fetch the file object using the URI
      fetch(asset.uri)
        .then((res) => res.blob())
        .then(async (blob) => {
          setImageFile(blob as any);
        })
        .catch((error) => {
          console.error("Error fetching file:", error);
        });
    }
  };

  return (
    <View>
      <AppPressable
        style={[
          styles.selectImage,
          {
            backgroundColor: colors.background200,
            borderColor: image ? "transparent" : colors.border,
          },
        ]}
        onPress={pickImage}
      >
        <Image source={{ uri: image?.uri }} style={styles.image} />
        {image !== null && (
          <AppText
            fontSize={Sizes.sm}
            style={[styles.changeImageText, { backgroundColor: colors.white }]}
          >
            Click image to change
          </AppText>
        )}
        <MaterialCommunityIcons
          name="image"
          size={32}
          color={colors.mediumText}
        />
        <AppText fontSize={Sizes.md} color={colors.mediumText}>
          Add Image
        </AppText>
      </AppPressable>
      <ErrorMessage visible error={error} />
    </View>
  );
};

export default AddProductImage;

const styles = StyleSheet.create({
  changeImageText: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    borderBottomLeftRadius: 4,
    padding: 3,
    paddingHorizontal: 6,
    fontWeight: "500",
  },
  image: {
    position: "absolute",
    zIndex: 1,
    height: "100%",
    width: "100%",
  },
  selectImage: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    aspectRatio: 1,
    borderRadius: Sizes.generalBorderRadius,
    borderWidth: 1,
    borderStyle: "dashed",
    overflow: "hidden",
  },
});
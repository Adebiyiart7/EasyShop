import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "./AppText";
import Sizes from "../config/Sizes";
import AppButton from "./AppButton";
import useTheme from "../hooks/useTheme";

interface Props {
  handleDelete: () => void;
  setBottomSheetVisible: (value: boolean) => void;
}

const DeleteWarning = ({ handleDelete, setBottomSheetVisible }: Props) => {
  const { colors } = useTheme();

  return (
    <View style={{ padding: Sizes.md }}>
      <View style={{ alignItems: "center" }}>
        <AppText style={{ fontWeight: "700", fontSize: 22 }}>
          Delete Product
        </AppText>
        <AppText>Are you sure you want to delete this product?</AppText>
      </View>
      <View
        style={{ flexDirection: "row", gap: Sizes.wall, marginTop: Sizes.md }}
      >
        <View style={{ flex: 1 }}>
          <AppButton
            secondary
            title="Cancel"
            onPress={() => setBottomSheetVisible(false)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <AppButton
            title="Delete"
            style={{ backgroundColor: colors.danger }}
            onPress={handleDelete}
          />
        </View>
      </View>
    </View>
  );
};

export default DeleteWarning;

const styles = StyleSheet.create({});

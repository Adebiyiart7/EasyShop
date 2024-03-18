import React, { useState } from "react";
import { Modal, StyleSheet, View, Pressable, Dimensions } from "react-native";
import useTheme from "../hooks/useTheme";

interface BottomSheetProps {
  maxHeight?: any;
  disableClose?: boolean;
  bottomSheetVisible: boolean;
  setBottomSheetVisible: (visible: boolean) => void;
  bottomSheetContent: React.ReactNode;
  animationType?: "fade" | "slide" | "none";
}

const BottomSheet = React.memo(
  ({
    disableClose,
    bottomSheetVisible,
    setBottomSheetVisible,
    bottomSheetContent,
    maxHeight,
    animationType,
  }: BottomSheetProps) => {
    const { colors } = useTheme();

    const [screenWidth, setScreenWidth] = useState(
      Dimensions.get("window").width
    );

    const modalViewStyles = {
      backgroundColor: colors.background,
      maxHeight: maxHeight ? maxHeight : "75%",
    };

    return (
      <View>
        <Modal
          animationType={animationType || "fade"}
          transparent={true}
          visible={bottomSheetVisible}
          statusBarTranslucent
        >
          <View style={styles.centeredView}>
            <Pressable
              onPress={() =>
                disableClose ? false : setBottomSheetVisible(false)
              }
              style={styles.backdrop}
            ></Pressable>
            <View
              style={[
                screenWidth > 600 ? styles.modalView : styles.mobileModalView,
                modalViewStyles,
              ]}
            >
              {bottomSheetContent}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  backdrop: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
  },
  centeredView: {
    flex: 1,
    display: "flex",
    position: "relative",
    justifyContent: "space-between",
    flexDirection: "column-reverse",
    backgroundColor: "#00000099",
  },
  closeButtonContainer: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  mobileModalView: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    width: "100%",
    bottom: 0,
    overflow: "hidden",
  },
  modalView: {
    borderRadius: 30,
    width: "100%",
    maxWidth: 425,
    margin: "auto",

    overflow: "hidden",
    alignSelf: "flex-end",
  },
  modalText: {
    marginBottom: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BottomSheet;

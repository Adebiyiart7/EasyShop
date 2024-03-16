import * as ImagePicker from "expo-image-picker";

// HANDLE UPLOAD MEDIA
const mediaPermission = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    console.error("Permission to access media library was denied");
    return;
  }
};

export default mediaPermission;

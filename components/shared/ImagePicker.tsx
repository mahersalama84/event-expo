import GetIcon from "@/components/icons/GetIcon";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { ImagePickerType } from "@/types/general";
import * as ExpoImagePicker from "expo-image-picker";
import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import EvtAvatar from "../EvtComponents/EvtAvatar";
import { ImageIcon } from "../icons/Icons";

const ImagePicker = (props: ImagePickerType) => {
  const { getThemeColor } = useBaseTheme();
  const uploadImageHandle = () => {
    ExpoImagePicker.launchImageLibraryAsync().then((imageObj) => {
      if (!imageObj.canceled) {
        let name_parts = imageObj.assets[0].uri.split("/");
        let fil_name = name_parts[name_parts.length - 1];
        let file = {
          name: fil_name,
          type: "image/jpeg",
          uri: imageObj.assets[0].uri,
        };
        props.setImage(file);
      }
    });
  };

  return (
    <TouchableOpacity style={styles.mainConatiner} onPress={uploadImageHandle}>
      {!props.image ? (
        <GetIcon
          icon={ImageIcon}
          size={Sizes.icon.size.xxxl}
          color={getThemeColor("tint")}
        />
      ) : (
        <EvtAvatar
          rounded
          title="select Image"
          source={
            props.image && props.edit
              ? { uri: props.image }
              : props.image
              ? props.image
              : undefined
          }
          size={Sizes.icon.size.xxxl}
          avatarContainerStyle={{ backgroundColor: "transparent" }}
        />
      )}
    </TouchableOpacity>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  mainConatiner: {
    alignItems: "center",
  },
});

import GetIcon from "@/components/icons/GetIcon";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as customerService from "@/services/customer";
import { useProfileStore } from "@/stores/ProfileStore";
import { getThemeColorType, ProfileImagePickerType } from "@/types/general";
import * as ExpoImagePicker from "expo-image-picker";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";
import EvtAvatar from "../EvtComponents/EvtAvatar";
import EvtView from "../EvtComponents/EvtView";
import { AddIcon, EditIcon, TrashIcon } from "../icons/Icons";
import LargeLoading from "./LargeLoading";

const ProfileImagePicker = (props: ProfileImagePickerType) => {
  const { getThemeColor } = useBaseTheme();
  const toast = useToast();

  const profile = useProfileStore((state) => state.profile);
  const uploadImage = useProfileStore((state) => state.uploadImage);
  const deleteImage = useProfileStore((state) => state.deleteImage);

  const deleteImageHandle = () => {
    props.setLoading(true);
    customerService
      .deleteImageApi()
      .then((response: any) => {
        props.setLoading(false);

        toast.show(response?.data?.message, { type: "success" });
        deleteImage();
        props.setLoading(false);
      })
      .catch((error: any) => {
        props.setLoading(false);
        toast.show(error?.response?.data?.message, { type: "danger" });
        props.setLoading(false);
      });
  };
  const uploadImageHandle = () => {
    ExpoImagePicker.launchImageLibraryAsync().then((imageObj) => {
      if (!imageObj.canceled) {
        props.setLoading(true);
        let name_parts = imageObj.assets[0].uri.split("/");
        let fil_name = name_parts[name_parts.length - 1];
        let file = {
          name: fil_name,
          type: "image/jpeg",
          uri: imageObj.assets[0].uri,
        };
        let formData = new FormData();

        formData.append("image", file);
        customerService
          .uploadImageApi(formData)
          .then((response: any) => {
            toast.show(response?.data?.message, { type: "success" });
            uploadImage(response?.data?.image);
            props.setLoading(false);
          })
          .catch((error: any) => {
            toast.show(error?.response?.data?.message, { type: "danger" });
            props.setLoading(false);
          });
      }
    });
  };

  return (
    <View style={styles(getThemeColor).mainConatiner}>
      {props.loading ? (
        <LargeLoading />
      ) : (
        <EvtAvatar
          rounded
          title={
            profile?.image ? profile?.full_name : profile?.full_name?.charAt(0)
          }
          source={profile?.image ? { uri: profile?.image } : undefined}
          background={profile?.image ? undefined : profile?.full_name}
          size={Sizes.icon.size.xxxl}
          avatarContainerStyle={{ backgroundColor: "transparent" }}
          badgeBottom
          badgeSize={Sizes.icon.size.xsm}
          badgeStatus={profile?.is_active}
        />
      )}
      <EvtView
        style={{ flexDirection: "row", marginTop: AppConstants.MEASURING_UNIT }}
      >
        {profile?.image && (
          <TouchableOpacity
            style={styles(getThemeColor).button}
            onPress={deleteImageHandle}
          >
            <GetIcon
              icon={TrashIcon}
              size={Sizes.icon.size.sm}
              color={getThemeColor("errorText")}
            />
          </TouchableOpacity>
        )}
        {profile?.image && (
          <TouchableOpacity
            style={styles(getThemeColor).button}
            onPress={uploadImageHandle}
          >
            <GetIcon
              icon={EditIcon}
              size={Sizes.icon.size.sm}
              color={getThemeColor("tint")}
            />
          </TouchableOpacity>
        )}
        {!profile?.image && (
          <TouchableOpacity
            style={styles(getThemeColor).button}
            onPress={uploadImageHandle}
          >
            <GetIcon
              icon={AddIcon}
              size={Sizes.icon.size.sm}
              color={getThemeColor("tint")}
            />
          </TouchableOpacity>
        )}
      </EvtView>
    </View>
  );
};

export default ProfileImagePicker;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    mainConatiner: {
      alignItems: "center",
    },
    button: {
      marginHorizontal: AppConstants.MEASURING_UNIT / 2,
      backgroundColor: getThemeColor("onBackground"),
      padding: Sizes.padding.md,
      borderRadius: Sizes.border.radius.xxl,
    },
  });

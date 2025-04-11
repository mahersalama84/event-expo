import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtView from "@/components/EvtComponents/EvtView";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useLanguageStore } from "@/stores/LanguageStore";
import { useProfileStore } from "@/stores/ProfileStore";
import { SelectedMobilePrefixType } from "@/types/general";
import { Image, StyleSheet } from "react-native";

const ProfileMobilePrefix = (props: SelectedMobilePrefixType) => {
  const isRTL = useLanguageStore((state) => state.isRTL);
  const profile = useProfileStore((state) => state.profile);
  const ImageSource =
    profile?.prefix == "971"
      ? require("@/assets/images/uae-flag.gif")
      : profile?.prefix == "46"
      ? require("@/assets/images/sw-flag.gif")
      : null;
  return (
    <EvtView style={[props.style, styles(isRTL, props.reverse).container]}>
      <EvtView style={styles(isRTL, props.reverse).imageContainer}>
        <Image
          style={styles(isRTL, props.reverse).image}
          source={ImageSource}
        />
      </EvtView>
      <EvtStyledText.Body color={props.color}>
        +{profile?.prefix}
      </EvtStyledText.Body>
    </EvtView>
  );
};
export default ProfileMobilePrefix;

const styles = (isRTL: boolean, reverse: boolean | undefined) =>
  StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: "transparent",
      flexDirection: isRTL && reverse ? "row-reverse" : "row",
      alignItems: "center",
    },
    imageContainer: {
      marginHorizontal: Sizes.padding.md / 2,
      borderRadius: Sizes.border.radius.lg,
      overflow: "hidden",
    },
    image: {
      width: AppConstants.SMALL_FLAG_IMAGE_WIDTH,
      height: AppConstants.SMALL_FLAG_IMAGE_HEIGHT,
      borderRadius: Sizes.border.radius.lg,
      overflow: "hidden",
    },
  });

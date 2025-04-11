import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtText from "@/components/EvtComponents/EvtText";
import EvtView from "@/components/EvtComponents/EvtView";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useLanguageStore } from "@/stores/LanguageStore";
import { useMobilePrefixStore } from "@/stores/MobilePrefixStore";
import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MobilePrefixModal from "./MobilPrefixModal";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { SelectedMobilePrefixType } from "@/types/general";

const SelectedMobilePrefix = (props: SelectedMobilePrefixType) => {
  const isRTL = useLanguageStore((state) => state.isRTL);
  const mobilePrefix = useMobilePrefixStore((state) => state.mobilePrefix);
  const { openBaseBottomSheet } = useBaseBottomSheet();
  const ImageSource =
    mobilePrefix == "971"
      ? require("@/assets/images/uae-flag.gif")
      : mobilePrefix == "46"
      ? require("@/assets/images/sw-flag.gif")
      : null;
  return (
    <TouchableOpacity
      onPress={() => {
        openBaseBottomSheet(<MobilePrefixModal />);
      }}
      style={[props.style, styles(isRTL, props.reverse).container]}
    >
      <EvtView style={styles(isRTL, props.reverse).imageContainer}>
        <Image
          style={styles(isRTL, props.reverse).image}
          source={ImageSource}
        />
      </EvtView>
      <EvtStyledText.Body color={props.color}>
        +{mobilePrefix}
      </EvtStyledText.Body>
    </TouchableOpacity>
  );
};
export default SelectedMobilePrefix;

const styles = (isRTL: boolean, reverse: boolean | undefined) =>
  StyleSheet.create({
    container: {
      flex: 1,
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

import EvtView from "@/components/EvtComponents/EvtView";
import GetIcon from "@/components/icons/GetIcon";
import { ImageIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { getThemeColorType, SkeletonType } from "@/types/general";
import { StyleSheet } from "react-native";

const CarouselAdvertisementItemSkeleton = (props: SkeletonType) => {
  const { getThemeColor } = useBaseTheme();

  return (
    <EvtView style={styles(getThemeColor).Container}>
      <GetIcon
        icon={ImageIcon}
        size={Sizes.icon.size.xxxl}
        color={getThemeColor("buttonDisabledColor")}
      />
    </EvtView>
  );
};
export default CarouselAdvertisementItemSkeleton;
const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    Container: {
      borderRadius: Sizes.border.radius.sm,
      width: AppConstants.WINDOW_WIDTH - Sizes.margin.md * 2,
      height: AppConstants.WINDOW_WIDTH * 0.4,
      paddingHorizontal: AppConstants.WINDOW_WIDTH * 0.025,
      marginTop: Sizes.margin.md,
      backgroundColor: getThemeColor("onBackground"),
      marginHorizontal: Sizes.margin.md,
      marginBottom: Sizes.margin.md * 2,
      alignItems: "center",
      justifyContent: "center",
    },
    imageContainer: {
      backgroundColor: getThemeColor("onBackground"),
      flex: 1,
      width: "100%",
      borderRadius: Sizes.border.radius.sm,
    },
  });

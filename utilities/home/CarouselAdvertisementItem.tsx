import EvtView from "@/components/EvtComponents/EvtView";
import LargeLoading from "@/components/shared/LargeLoading";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { AdvertisementItemType, getThemeColorType } from "@/types/general";
import { StyleSheet } from "react-native";
import { Image } from "react-native-elements";

const CarouselAdvertisementItem = ({ item }: AdvertisementItemType) => {
  const { getThemeColor } = useBaseTheme();

  return (
    <EvtView style={styles(getThemeColor).Container}>
      <Image
        source={{ uri: item }}
        resizeMode="stretch"
        containerStyle={styles(getThemeColor).imageContainer}
        borderRadius={Sizes.border.radius.sm}
        PlaceholderContent={<LargeLoading />}
        placeholderStyle={styles(getThemeColor).Container}
      />
    </EvtView>
  );
};
export default CarouselAdvertisementItem;
const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    Container: {
      borderRadius: Sizes.border.radius.sm,
      width: AppConstants.WINDOW_WIDTH,
      height: AppConstants.WINDOW_WIDTH * 0.4,
      paddingHorizontal: AppConstants.WINDOW_WIDTH * 0.025,
      marginTop: AppConstants.MEASURING_UNIT,
      backgroundColor: "transparent",
    },
    imageContainer: {
      backgroundColor: getThemeColor("background"),
      flex: 1,
      width: "100%",
      borderRadius: Sizes.border.radius.sm,
    },
  });

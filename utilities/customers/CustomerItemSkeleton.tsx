import EvtStyles from "@/assets/styles/EvtStyles";
import EvtSkeleton from "@/components/EvtComponents/EvtSkeleton";
import EvtView from "@/components/EvtComponents/EvtView";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { getThemeColorType, SkeletonType } from "@/types/general";
import { StyleSheet } from "react-native";

const CustomerItemSkeleton = (props: SkeletonType) => {
  const { getThemeColor } = useBaseTheme();
  return (
    <EvtView
      style={[
        styles(getThemeColor).containerShadow,
        props.shadow
          ? {
              paddingLeft: AppConstants.SHADOW_WIDTH,
              paddingBottom: AppConstants.SHADOW_WIDTH,
            }
          : {},
      ]}
    >
      <EvtView style={[styles(getThemeColor).container]}>
        <EvtSkeleton
          width={50}
          height={50}
          borderRadius={Sizes.border.radius.xxl}
        />
        <EvtView style={styles(getThemeColor).lisItemsContainer}>
          <EvtSkeleton
            randomWidth
            minWidth={30}
            maxWidth={50}
            height={15}
            marginBottom={AppConstants.MEASURING_UNIT / 2}
          />
          <EvtSkeleton randomWidth minWidth={30} maxWidth={50} height={15} />
        </EvtView>
      </EvtView>
    </EvtView>
  );
};

export default CustomerItemSkeleton;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    containerShadow: {
      height: AppConstants.CUSTOMER_ITEM_HEIGHT,
      shadowColor: getThemeColor("placeholder"),
      borderRadius: Sizes.border.radius.md,
      ...EvtStyles.components.cardShadow,
    },
    container: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: getThemeColor("onBackground"),
      padding: Sizes.padding.md,
      borderRadius: Sizes.border.radius.md,
    },
    lisItemsContainer: {
      marginStart: Sizes.margin.md,
      backgroundColor: getThemeColor("onBackground"),
    },
  });

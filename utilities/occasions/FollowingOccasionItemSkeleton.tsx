import EvtStyles from "@/assets/styles/EvtStyles";
import EvtDevider from "@/components/EvtComponents/EvtDevider";
import EvtSkeleton from "@/components/EvtComponents/EvtSkeleton";
import EvtView from "@/components/EvtComponents/EvtView";
import GetIcon from "@/components/icons/GetIcon";
import { CustomerIcon, OccasionsIcon } from "@/components/icons/Icons";
import Spacer from "@/components/shared/Spacer";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { getThemeColorType, SkeletonType } from "@/types/general";
import { StyleSheet } from "react-native";

const FollowingOccasionItemSkeleton = (props: SkeletonType) => {
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
      <EvtView style={styles(getThemeColor).container}>
        <EvtView style={styles(getThemeColor).imageContainer}>
          <GetIcon
            variant="Linear"
            icon={CustomerIcon}
            color={getThemeColor("buttonDisabledColor")}
            size={Sizes.icon.size.xxxl}
          />
        </EvtView>
        {/* <EvtDevider height={1} color={getThemeColor("background")} /> */}
        <EvtView style={styles(getThemeColor).wishesContainer}>
          <EvtSkeleton
            randomWidth
            minWidth={30}
            maxWidth={100}
            height={15}
            marginBottom={AppConstants.MEASURING_UNIT / 4}
          />
        </EvtView>
        <EvtView style={styles(getThemeColor).wishesContainer}>
          <EvtSkeleton
            randomWidth
            minWidth={30}
            maxWidth={100}
            height={15}
            marginBottom={AppConstants.MEASURING_UNIT / 4}
          />
        </EvtView>
      </EvtView>
    </EvtView>
  );
};

export default FollowingOccasionItemSkeleton;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    containerShadow: {
      height: AppConstants.FOLLOWINGS_OCCASION_ITEM_HEIGHT,
      width: AppConstants.FOLLOWINGS_OCCASION_ITEM_WIDTH,
      shadowColor: getThemeColor("placeholder"),
      borderRadius: Sizes.border.radius.md,
      ...EvtStyles.components.cardShadow,
    },
    container: {
      flex: 1,
      backgroundColor: getThemeColor("onBackground"),
      padding: Sizes.padding.md,
      borderRadius: Sizes.border.radius.md,
    },
    imageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: getThemeColor("onBackground"),
    },
    wishesContainer: {
      flexDirection: "row",
      marginTop: Sizes.margin.md,
      justifyContent: "space-between",
      backgroundColor: getThemeColor("onBackground"),
    },
  });

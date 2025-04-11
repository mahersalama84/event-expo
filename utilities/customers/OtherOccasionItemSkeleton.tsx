import EvtStyles from "@/assets/styles/EvtStyles";
import EvtDevider from "@/components/EvtComponents/EvtDevider";
import EvtSkeleton from "@/components/EvtComponents/EvtSkeleton";
import EvtView from "@/components/EvtComponents/EvtView";
import GetIcon from "@/components/icons/GetIcon";
import { OccasionsIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { getThemeColorType, SkeletonType } from "@/types/general";
import { StyleSheet } from "react-native";

const OtherOccasionItemSkeleton = (props: SkeletonType) => {
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
        <EvtView
          style={{
            alignItems: "center",
            backgroundColor: getThemeColor("onBackground"),
          }}
        >
          <GetIcon
            variant="Linear"
            icon={OccasionsIcon}
            color={getThemeColor("buttonDisabledColor")}
            size={Sizes.icon.size.lg}
          />
        </EvtView>
        <EvtDevider height={1} color={getThemeColor("background")} />
        <EvtView style={styles(getThemeColor).wishesContainer}>
          <EvtSkeleton
            randomWidth
            minWidth={30}
            maxWidth={50}
            height={15}
            marginBottom={AppConstants.MEASURING_UNIT / 4}
          />
        </EvtView>
        <EvtView style={styles(getThemeColor).wishesContainer}>
          <EvtSkeleton
            randomWidth
            minWidth={30}
            maxWidth={50}
            height={15}
            marginBottom={AppConstants.MEASURING_UNIT / 4}
          />
        </EvtView>
      </EvtView>
    </EvtView>
  );
};

export default OtherOccasionItemSkeleton;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    containerShadow: {
      flex: 0.5,
      height: AppConstants.OTHER_OCCASION_ITEM_HEIGHT,
      shadowColor: getThemeColor("placeholder"),
      borderRadius: Sizes.border.radius.md,
      ...EvtStyles.components.cardShadow,
      marginRight: AppConstants.SHADOW_WIDTH,
    },
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: getThemeColor("onBackground"),
      padding: Sizes.padding.md,
      borderRadius: Sizes.border.radius.md,
    },
    wishesContainer: {
      flexDirection: "row",
      marginTop: Sizes.margin.md / 2,
      justifyContent: "space-between",
      backgroundColor: getThemeColor("onBackground"),
    },
  });

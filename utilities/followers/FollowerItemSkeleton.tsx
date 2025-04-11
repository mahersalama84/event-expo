import EvtStyles from "@/assets/styles/EvtStyles";
import EvtSkeleton from "@/components/EvtComponents/EvtSkeleton";
import EvtView from "@/components/EvtComponents/EvtView";
import GetIcon from "@/components/icons/GetIcon";
import { CustomerIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { getThemeColorType, SkeletonType } from "@/types/general";
import { StyleSheet } from "react-native";

const FollowerItemSkeleton = (props: SkeletonType) => {
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
          style={{
            marginLeft: Sizes.margin.md,
            marginTop: Sizes.margin.md / 2,
          }}
          randomWidth
          minWidth={30}
          maxWidth={100}
          height={15}
        />
        <EvtSkeleton
          style={{
            marginLeft: Sizes.margin.md,
            marginTop: Sizes.margin.md / 2,
          }}
          randomWidth
          minWidth={30}
          maxWidth={100}
          height={15}
        />
        <EvtView style={styles(getThemeColor).imageContainer}>
          <GetIcon
            icon={CustomerIcon}
            color={getThemeColor("buttonDisabledColor")}
            size={Sizes.icon.size.lg}
          />
        </EvtView>
      </EvtView>
    </EvtView>
  );
};

export default FollowerItemSkeleton;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    containerShadow: {
      flex: 0.5,
      height: AppConstants.FOLLOWING_ITEM_HEIGHT,
      shadowColor: getThemeColor("placeholder"),
      borderRadius: Sizes.border.radius.md,
      ...EvtStyles.components.cardShadow,
      marginRight: AppConstants.SHADOW_WIDTH,
    },
    container: {
      flex: 1,
      flexDirection: "column",
      borderRadius: Sizes.border.radius.md,
      backgroundColor: getThemeColor("onBackground"),
    },
    imageContainer: {
      backgroundColor: getThemeColor("transparent"),
      alignItems: "center",
      justifyContent: "center",
      borderRadius: Sizes.border.radius.md,
      marginTop: Sizes.margin.md / 2,
    },
  });

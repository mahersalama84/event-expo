import EvtStyles from "@/assets/styles/EvtStyles";
import EvtAvatar from "@/components/EvtComponents/EvtAvatar";
import EvtChip from "@/components/EvtComponents/EvtChip";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtView from "@/components/EvtComponents/EvtView";
import GetIcon from "@/components/icons/GetIcon";
import { CustomersIcon, MoreIcon, WishesIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { useMyOccasionsStore } from "@/stores/MyOccasionsStore";
import { useOtherOccasionsStore } from "@/stores/OtherOccasionsStore";
import { getThemeColorType } from "@/types/general";
import { OccasionProps } from "@/types/occasion";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import OtherOccasionOptionsModal from "./OtherOccasionOptionsModal";

const FollowingOccasionItem = (props: OccasionProps) => {
  const [active, setActive] = useState(false);

  const { getThemeColor } = useBaseTheme();
  const { openBaseBottomSheet, closeBaseBottomSheet } = useBaseBottomSheet();
  const selectOccasion = useOtherOccasionsStore(
    (state) => state.selectOccasion
  );

  const unSelectMyOccasion = useMyOccasionsStore(
    (state) => state.unSelectOccasion
  );
  const unSelectOtherOccasion = useOtherOccasionsStore(
    (state) => state.unSelectOccasion
  );

  const handlePress = () => {
    closeBaseBottomSheet();
    unSelectMyOccasion();
    unSelectOtherOccasion();
    selectOccasion(props.item);
    openBaseBottomSheet(<OtherOccasionOptionsModal />);
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={() => setActive(true)}
      onPressOut={() => setActive(false)}
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
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={[
          styles(getThemeColor).container,
          !active
            ? { backgroundColor: getThemeColor("onBackground") }
            : { backgroundColor: getThemeColor("placeholder") },
        ]}
      >
        <EvtView style={styles(getThemeColor).imageContainer}>
          <EvtAvatar
            rounded
            title={
              props.item.customer?.image
                ? props.item.customer?.full_name
                : props.item.customer?.full_name?.charAt(0)
            }
            source={
              props.item.customer?.image
                ? { uri: props.item.customer?.image }
                : undefined
            }
            background={
              props.item.customer?.image
                ? undefined
                : props.item.customer?.full_name
            }
            size={Sizes.icon.size.xxxl}
            avatarContainerStyle={{ backgroundColor: "transparent" }}
            badgeBottom
            badgeSize={Sizes.icon.size.xs}
            badgeStatus={props.item.customer?.is_active}
          />
        </EvtView>
        {/* <EvtDevider height={1} color={getThemeColor("placeholder")} /> */}
        <EvtStyledText.Body numberOfLines={1} ellipsizeMode="tail">
          {props.item.title}
        </EvtStyledText.Body>
        <EvtView style={styles(getThemeColor).wishesContainer}>
          <EvtView style={styles(getThemeColor).chipsContainer}>
            <EvtChip
              style={styles(getThemeColor).chips}
              title={props.item.wishes_count}
              titleColor={getThemeColor("text")}
              iconColor={getThemeColor("tint")}
              icon={WishesIcon}
              iconSize={Sizes.icon.size.xs}
            />
            <EvtChip
              style={styles(getThemeColor).chips}
              title={props.item.attendence_ids.length}
              titleColor={getThemeColor("text")}
              iconColor={getThemeColor("tint")}
              icon={CustomersIcon}
              iconSize={Sizes.icon.size.xs}
            />
          </EvtView>

          <TouchableOpacity
            onPress={handlePress}
            style={styles(getThemeColor).moreContainer}
          >
            <GetIcon
              icon={MoreIcon}
              color={getThemeColor("tint")}
              size={Sizes.icon.size.xsm}
            />
          </TouchableOpacity>
        </EvtView>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default FollowingOccasionItem;

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
      backgroundColor: getThemeColor("transparent"),
    },
    wishesContainer: {
      flexDirection: "row",
      marginTop: Sizes.margin.md,
      justifyContent: "space-between",
      backgroundColor: getThemeColor("transparent"),
    },
    chipsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: getThemeColor("transparent"),
    },
    chips: {
      backgroundColor: getThemeColor("background"),
      width: AppConstants.SMALL_CHIP_WIDTH,
      height: AppConstants.SMALL_CHIP_HEIGHT,
    },
    moreContainer: {
      right: AppConstants.MEASURING_UNIT / 2,
      bottom: 0,
      position: "absolute",
    },
  });

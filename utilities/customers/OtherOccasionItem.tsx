import EvtStyles from "@/assets/styles/EvtStyles";
import EvtChip from "@/components/EvtComponents/EvtChip";
import EvtDevider from "@/components/EvtComponents/EvtDevider";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtView from "@/components/EvtComponents/EvtView";
import GetIcon from "@/components/icons/GetIcon";
import {
  CustomersIcon,
  MoreIcon,
  OccasionsIcon,
  WishesIcon,
} from "@/components/icons/Icons";
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
import OtherOccasionOptionsModal from "../occasions/OtherOccasionOptionsModal";

const OtherOccasionItem = (props: OccasionProps) => {
  const [active, setActive] = useState(false);

  const { getThemeColor } = useBaseTheme();
  const { isOpen, openBaseBottomSheet, closeBaseBottomSheet } =
    useBaseBottomSheet();
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
    if (!isOpen) openBaseBottomSheet(<OtherOccasionOptionsModal />);
    else closeBaseBottomSheet();
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
        <EvtView
          style={{
            alignItems: "center",
            backgroundColor: getThemeColor("transparent"),
          }}
        >
          <GetIcon
            variant="Bulk"
            icon={OccasionsIcon}
            color={getThemeColor("placeholder")}
            size={Sizes.icon.size.lg}
          />
        </EvtView>
        <EvtDevider height={1} color={getThemeColor("placeholder")} />
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

export default OtherOccasionItem;

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
      padding: Sizes.padding.md,
      borderRadius: Sizes.border.radius.md,
    },
    wishesContainer: {
      flexDirection: "row",
      marginTop: Sizes.margin.md / 2,
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
      right: Sizes.margin.md / 2,
      bottom: 0,
      position: "absolute",
    },
  });

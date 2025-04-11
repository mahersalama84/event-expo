import EvtStyles from "@/assets/styles/EvtStyles";
import EvtAvatar from "@/components/EvtComponents/EvtAvatar";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtView from "@/components/EvtComponents/EvtView";
import GetIcon from "@/components/icons/GetIcon";
import { ArrowRight2Icon } from "@/components/icons/Icons";
import Spacer from "@/components/shared/Spacer";
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

const OccasionItem = (props: OccasionProps) => {
  const [active, setActive] = useState(false);

  const { getThemeColor } = useBaseTheme();
  const selectOccasion = useOtherOccasionsStore(
    (state) => state.selectOccasion
  );
  const unSelectMyOccasion = useMyOccasionsStore(
    (state) => state.unSelectOccasion
  );
  const unSelectOtherOccasion = useOtherOccasionsStore(
    (state) => state.unSelectOccasion
  );
  const { openBaseBottomSheet, closeBaseBottomSheet } = useBaseBottomSheet();
  return (
    <TouchableOpacity
      onPressIn={() => setActive(true)}
      onPressOut={() => setActive(false)}
      onPress={() => {
        closeBaseBottomSheet();
        unSelectMyOccasion();
        unSelectOtherOccasion();
        selectOccasion(props.item);
        openBaseBottomSheet(<OtherOccasionOptionsModal />);
      }}
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
          size={Sizes.icon.size.xlg}
          avatarContainerStyle={{ backgroundColor: "transparent" }}
          badgeBottom
          badgeSize={Sizes.icon.size.xs}
          badgeStatus={props.item.customer?.is_active}
        />
        <EvtView style={styles(getThemeColor).lisItemsContainer}>
          <EvtView style={styles(getThemeColor).lisItem}>
            <EvtStyledText.BodyBold numberOfLines={1} ellipsizeMode="tail">
              {props.item.customer?.full_name}
            </EvtStyledText.BodyBold>
          </EvtView>
          <EvtView style={styles(getThemeColor).lisItem}>
            <EvtStyledText.Body numberOfLines={1} ellipsizeMode="tail">
              {props.item.title}
            </EvtStyledText.Body>
          </EvtView>
        </EvtView>
        <Spacer flex />
        <EvtView style={styles(getThemeColor).lisItemsContainer}>
          <EvtView style={styles(getThemeColor).lisItem}></EvtView>
          <EvtStyledText.Body>{props.item.wishes_count}</EvtStyledText.Body>
        </EvtView>
        <GetIcon
          variant="Bold"
          icon={ArrowRight2Icon}
          color={getThemeColor("tint")}
          size={Sizes.icon.size.sm}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default OccasionItem;

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
      justifyContent: "center",
      alignItems: "center",
      padding: Sizes.padding.md,
      borderRadius: Sizes.border.radius.md,
    },
    lisItemsContainer: {
      marginStart: Sizes.margin.md,
      backgroundColor: getThemeColor("transparent"),
    },
    lisItem: {
      maxWidth: AppConstants.WINDOW_WIDTH - 200,
      backgroundColor: getThemeColor("transparent"),
    },
  });

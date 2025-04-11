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
import { useCustomersStore } from "@/stores/CustomerStore";
import { useFollowersStore } from "@/stores/FollowerStore";
import { useFollowingsStore } from "@/stores/FollowingStore";
import { useOtherOccasionsStore } from "@/stores/OtherOccasionsStore";
import { ProfileProps } from "@/types/customer";
import { getThemeColorType } from "@/types/general";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import CustomerOptionsModal from "./CustomerOptionsModal";

const CustomerItem = (props: ProfileProps) => {
  const [active, setActive] = useState(false);
  const { getThemeColor } = useBaseTheme();
  const { openBaseBottomSheet, closeBaseBottomSheet } = useBaseBottomSheet();
  const clearOccasions = useOtherOccasionsStore(
    (state) => state.clearOccasions
  );
  const selectCustomer = useCustomersStore((state) => state.selectCustomer);
  const unSelectFollowing = useFollowingsStore(
    (state) => state.unSelectFollowing
  );
  const unselectFollower = useFollowersStore((state) => state.unSelectFollower);
  return (
    <TouchableOpacity
      onPressIn={() => setActive(true)}
      onPressOut={() => setActive(false)}
      onPress={() => {
        clearOccasions();
        closeBaseBottomSheet();
        unSelectFollowing();
        unselectFollower();
        selectCustomer(props.item);
        openBaseBottomSheet(<CustomerOptionsModal />);
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
            props.item.image
              ? props.item?.full_name
              : props.item?.full_name?.charAt(0)
          }
          source={props.item.image ? { uri: props.item?.image } : undefined}
          background={props.item.image ? undefined : props.item?.full_name}
          size={Sizes.icon.size.xlg}
          avatarContainerStyle={{ backgroundColor: "transparent" }}
          badgeBottom
          badgeSize={Sizes.icon.size.xs}
          badgeStatus={props.item?.is_active}
        />
        <EvtView style={styles(getThemeColor).lisItemsContainer}>
          <EvtView style={styles(getThemeColor).lisItem}>
            <EvtStyledText.BodyBold numberOfLines={1} ellipsizeMode="tail">
              {props.item.full_name}
            </EvtStyledText.BodyBold>
          </EvtView>
          <EvtView style={styles(getThemeColor).lisItem}>
            <EvtStyledText.Body>{props.item.mobile_no}</EvtStyledText.Body>
          </EvtView>
        </EvtView>
        <Spacer flex />
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

export default CustomerItem;

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

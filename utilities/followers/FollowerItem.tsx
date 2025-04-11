import EvtFontStyles from "@/assets/styles/EvtFontStyles";
import EvtStyles from "@/assets/styles/EvtStyles";
import EvtChip from "@/components/EvtComponents/EvtChip";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtView from "@/components/EvtComponents/EvtView";
import GetIcon from "@/components/icons/GetIcon";
import { HeartIcon, MoreIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { useCustomersStore } from "@/stores/CustomerStore";
import { useFollowersStore } from "@/stores/FollowerStore";
import { useFollowingsStore } from "@/stores/FollowingStore";
import { ProfileProps } from "@/types/customer";
import { getThemeColorType } from "@/types/general";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import CustomersFunctions from "../CustomersFunctions";
import GlobalFunctions from "../GlobalFunctions";
import FollowerOptionsModal from "./FollowerOptionsModal";

const FollowerItem = (props: ProfileProps) => {
  const [active, setActive] = useState(false);

  const { getThemeColor } = useBaseTheme();
  const { openBaseBottomSheet, closeBaseBottomSheet } = useBaseBottomSheet();

  const selectFollower = useFollowersStore((state) => state.selectFollower);
  const unSelectFollowing = useFollowingsStore(
    (state) => state.unSelectFollowing
  );
  const unselectCustomer = useCustomersStore((state) => state.unSelectCustomer);

  const handlePress = () => {
    closeBaseBottomSheet();
    unSelectFollowing();
    unselectCustomer();
    selectFollower(props.item);
    openBaseBottomSheet(<FollowerOptionsModal />);
  };
  return (
    <TouchableOpacity
      onPressIn={() => setActive(true)}
      onPressOut={() => setActive(false)}
      onPress={
        CustomersFunctions.isFollower(props.item.id) ? handlePress : () => {}
      }
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
          {props.item.image ? (
            <Image
              source={{ uri: props.item.image }}
              style={styles(getThemeColor).image}
            />
          ) : (
            <EvtStyledText.Body
              style={[
                styles(getThemeColor).char,
                {
                  backgroundColor: GlobalFunctions.randomColor(
                    props.item.full_name
                  ),
                },
              ]}
            >
              {props.item.full_name.charAt(0)}
            </EvtStyledText.Body>
          )}
        </EvtView>
        <EvtChip
          style={styles(getThemeColor).fullNameChip}
          title={props.item.full_name}
          titleColor={getThemeColor("buttonTitleColor")}
        />
        <EvtView style={styles(getThemeColor).followerContainer}>
          <GetIcon
            icon={CustomersFunctions.FollowerIconStatus(props.item.id)}
            variant="Bold"
            color={getThemeColor("buttonTitleColor")}
            size={Sizes.icon.size.xsm}
          />
        </EvtView>
        <TouchableOpacity
          onPress={handlePress}
          style={styles(getThemeColor).moreContainer}
        >
          <GetIcon
            icon={MoreIcon}
            color={getThemeColor("buttonTitleColor")}
            size={Sizes.icon.size.xsm}
          />
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default FollowerItem;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    containerShadow: {
      flex: 0.5,
      height: AppConstants.FOLLOWER_ITEM_HEIGHT,
      shadowColor: getThemeColor("placeholder"),
      borderRadius: Sizes.border.radius.md,
      ...EvtStyles.components.cardShadow,
      marginRight: AppConstants.SHADOW_WIDTH,
    },
    container: {
      flex: 1,
      flexDirection: "column",
      borderRadius: Sizes.border.radius.md,
    },
    followerContainer: {
      backgroundColor: "transparent",
      right: AppConstants.MEASURING_UNIT / 2,
      top: AppConstants.MEASURING_UNIT / 2,
      position: "absolute",
    },
    moreContainer: {
      right: AppConstants.MEASURING_UNIT / 2,
      bottom: 0,
      position: "absolute",
    },
    fullNameChip: {
      marginTop: Sizes.margin.md / 2,
      position: "absolute",
      backgroundColor: getThemeColor("tint"),
      marginLeft: Sizes.margin.md / 2,
      width: AppConstants.MEDIUM_CHIP_WIDTH,
      height: AppConstants.MEDIUM_CHIP_HEIGHT,
      padding: 0,
      paddingLeft: Sizes.padding.md,
      ...EvtFontStyles.Caption3,
    },
    imageContainer: {
      flex: 1,
      borderRadius: Sizes.border.radius.md,
      overflow: "hidden",
    },
    image: {
      flex: 1,
      width: "100%",
      height: AppConstants.FOLLOWER_ITEM_HEIGHT - AppConstants.SHADOW_WIDTH,
      borderRadius: Sizes.border.radius.md,
    },
    char: {
      flex: 1,
      borderRadius: Sizes.border.radius.md,
      height: AppConstants.FOLLOWER_ITEM_HEIGHT - AppConstants.SHADOW_WIDTH,
      width: "100%",
      ...EvtFontStyles.hugeTitle,
      textAlignVertical: "center",
      textAlign: "center",
      color: getThemeColor("buttonTitleColor"),
    },
  });

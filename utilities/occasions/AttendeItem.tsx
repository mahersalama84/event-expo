import EvtStyles from "@/assets/styles/EvtStyles";
import EvtChip from "@/components/EvtComponents/EvtChip";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtView from "@/components/EvtComponents/EvtView";
import GetIcon from "@/components/icons/GetIcon";
import { MoreIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { useAttendesStore } from "@/stores/AttendeStore";
import { ProfileProps } from "@/types/customer";
import { getThemeColorType } from "@/types/general";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import ShowAttendeModal from "../customers/ShowAttendeModal";
import GlobalFunctions from "../GlobalFunctions";
import EvtFontStyles from "@/assets/styles/EvtFontStyles";

const AttendeItem = (props: ProfileProps) => {
  const [active, setActive] = useState(false);

  const { getThemeColor } = useBaseTheme();
  const { openBaseBottomSheet, closeBaseBottomSheet } = useBaseBottomSheet();
  const selectAttende = useAttendesStore((state) => state.selectAttende);

  const handlePress = () => {
    closeBaseBottomSheet();
    selectAttende(props.item);
    openBaseBottomSheet(<ShowAttendeModal />);
  };
  return (
    <TouchableOpacity
      onPressIn={() => setActive(true)}
      onPressOut={() => setActive(false)}
      onPress={handlePress}
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
        <TouchableOpacity
          onPress={handlePress}
          style={styles(getThemeColor).moreContainer}
        >
          <GetIcon
            icon={MoreIcon}
            color={getThemeColor("buttonTitleColor")}
            size={Sizes.icon.size.xs}
          />
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AttendeItem;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    containerShadow: {
      flex: 0.5,
      height: AppConstants.ATTENDE_ITEM_HEIGHT,
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
    moreContainer: {
      right: AppConstants.MEASURING_UNIT,
      bottom: AppConstants.MEASURING_UNIT,
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
      width: "100%",
      height: AppConstants.ATTENDE_ITEM_HEIGHT - AppConstants.SHADOW_WIDTH,
      borderRadius: Sizes.border.radius.md,
      borderTopEndRadius: Sizes.border.radius.md,
    },
    char: {
      flex: 1,
      borderRadius: Sizes.border.radius.md,
      height: AppConstants.ATTENDE_ITEM_HEIGHT - AppConstants.SHADOW_WIDTH,
      width: "100%",
      ...EvtFontStyles.hugeTitle,
      textAlignVertical: "center",
      textAlign: "center",
      color: getThemeColor("buttonTitleColor"),
    },
  });

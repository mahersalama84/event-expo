import HeaderTextAnimation from "@/animations/HeaderTextAnimation";
import GetIcon from "@/components/icons/GetIcon";
import { BackArrowIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useLanguageStore } from "@/stores/LanguageStore";
import { BackButtonType } from "@/types/general";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import EvtStyledText from "../EvtComponents/EvtStyledText";
import EvtView from "../EvtComponents/EvtView";
import Spacer from "./Spacer";

const BackButton = (props: BackButtonType) => {
  const isRTL = useLanguageStore((state) => state.isRTL);
  const { closeBaseBottomSheet } = useBaseBottomSheet();

  const { scrollY, style, ...otherProps } = props;

  return (
    <EvtView style={styles(isRTL).container} {...otherProps}>
      <TouchableOpacity
        onPress={() => {
          closeBaseBottomSheet();
          router.back();
        }}
        style={[style, styles(isRTL).backContainer]}
      >
        <EvtView style={styles(isRTL).iconContainer}>
          <GetIcon
            icon={BackArrowIcon}
            color={props.color}
            size={Sizes.icon.size.xmd}
            style={styles(isRTL).icon}
          />
        </EvtView>
      </TouchableOpacity>
      {props.headerText && props.headerText != "" && (
        <HeaderTextAnimation scrollY={scrollY}>
          <EvtStyledText.LayoutHeader style={[style, styles(isRTL).headerText]}>
            {props.headerText}
          </EvtStyledText.LayoutHeader>
        </HeaderTextAnimation>
      )}
      <Spacer flex />
      {props.handlePressAction && (
        <TouchableOpacity
          style={[style, styles(isRTL).actionContainer]}
          onPress={props.handlePressAction}
        >
          <GetIcon
            icon={props.actionIcon}
            color={props.color}
            size={Sizes.icon.size.md}
          />
        </TouchableOpacity>
      )}
    </EvtView>
  );
};

export default BackButton;

const styles = (isRTL: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      zIndex: AppConstants.LAYER_TOP,
      backgroundColor: "transparent",
      alignItems: "center",
    },
    backContainer: {
      flexDirection: "row",
    },
    iconContainer: {
      // marginLeft: Sizes.margin.md,
      backgroundColor: "tansparent",
    },
    icon: isRTL ? { transform: [{ rotateY: "180deg" }] } : {},
    headerText: {
      marginLeft: Sizes.margin.md,
    },
    actionContainer: {
      marginRight: Sizes.margin.md,
      backgroundColor: "tansparent",
    },
  });

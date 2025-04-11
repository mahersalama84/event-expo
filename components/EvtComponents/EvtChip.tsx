import GetIcon from "@/components/icons/GetIcon";
import Spacer from "@/components/shared/Spacer";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { ChipType } from "@/types/general";
import { StyleSheet } from "react-native";
import EvtStyledText from "./EvtStyledText";
import EvtView from "./EvtView";

const EvtChip = (props: ChipType) => {
  return (
    <EvtView style={[props.style, styles.container]}>
      {props.icon && (
        <GetIcon
          icon={props.icon}
          color={props.iconColor}
          size={props.iconSize}
        />
      )}
      {props.icon && (
        <Spacer width={AppConstants.MEASURING_UNIT} style={props.style} />
      )}
      <EvtStyledText.Chip
        color={props.titleColor}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {props.title}
      </EvtStyledText.Chip>
    </EvtView>
  );
};

export default EvtChip;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: "space-between",
    borderRadius: Sizes.border.radius.xxl,
    paddingHorizontal: Sizes.padding.sm,
    alignItems: "center",
  },
});

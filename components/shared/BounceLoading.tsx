import BounceAnimation from "@/animations/BounceAnimation";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { BounceLoadingType, getThemeColorType } from "@/types/general";
import { StyleSheet } from "react-native";
import EvtView from "../EvtComponents/EvtView";

const BounceLoading = (props: BounceLoadingType) => {
  const { getThemeColor } = useBaseTheme();

  const MOVE_Y = props.circleSize - props.dotSize - props.circleBorderWidth - 1;

  return (
    <EvtView style={styles(getThemeColor, props).container}>
      <BounceAnimation direction={props.direction} MOVE_Y={MOVE_Y}>
        <EvtView style={styles(getThemeColor, props).dot}></EvtView>
      </BounceAnimation>
    </EvtView>
  );
};
export default BounceLoading;

const styles = (getThemeColor: getThemeColorType, props: BounceLoadingType) =>
  StyleSheet.create({
    container: {
      width: props.circleSize,
      height: props.circleSize,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      borderColor: props.color ?? getThemeColor("tint"),
      borderWidth: props.circleBorderWidth,
      borderRadius: Sizes.border.radius.xxl,
    },
    dot: {
      bottom: props.circleSize / 2 - props.dotSize / 2 - 1,
      width: props.dotSize,
      height: props.dotSize,
      backgroundColor: props.color ?? getThemeColor("tint"),
      borderRadius: Sizes.border.radius.xxl,
    },
  });

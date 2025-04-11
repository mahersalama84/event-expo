import EvtStyles from "@/assets/styles/EvtStyles";
import GetIcon from "@/components/icons/GetIcon";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { CardOptionTypeProps } from "@/types/card";
import { getThemeColorType } from "@/types/general";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  SlideInRight,
  SlideInLeft,
} from "react-native-reanimated";
import EvtStyledText from "../EvtComponents/EvtStyledText";
import MediumLoading from "./MediumLoading";
import { useLanguageStore } from "@/stores/LanguageStore";

const CardOption = (props: CardOptionTypeProps) => {
  const isRTL = useLanguageStore((state) => state.isRTL);
  const [active, setActive] = useState(false);
  const { getThemeColor } = useBaseTheme();
  let color = props.option.textColor;
  let noReverse = props.option.noReverse;
  return (
    <Animated.View
      key={props.option.key}
      entering={
        props?.option?.index
          ? (isRTL ? SlideInLeft : SlideInRight).delay(
              props?.option?.index * 100
            )
          : FadeIn
      }
    >
      <TouchableOpacity
        onPressIn={() => setActive(true)}
        onPressOut={() => setActive(false)}
        onPress={props.option.pressed}
        style={[
          styles(getThemeColor).card,
          !active
            ? { backgroundColor: getThemeColor("onBackground") }
            : { backgroundColor: getThemeColor("placeholder") },
        ]}
        key={props.option.title}
      >
        <EvtStyledText.Body color={color}>
          {props.option.title}
        </EvtStyledText.Body>
        {props.option.loading ? (
          <MediumLoading />
        ) : (
          <GetIcon
            variant={props.option.iconVariant ?? "Linear"}
            icon={props.option.icon}
            size={Sizes.icon.size.md}
            color={color}
            noReverse={noReverse}
          />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};
export default CardOption;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    card: {
      ...EvtStyles.components.card,
      backgroundColor: getThemeColor("onBackground"),
      padding: AppConstants.MEASURING_UNIT,
      marginVertical: AppConstants.MEASURING_UNIT / 2,
      borderRadius: Sizes.border.radius.md,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });

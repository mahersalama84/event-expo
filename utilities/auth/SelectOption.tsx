import EvtStyles from "@/assets/styles/EvtStyles";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { useLanguageStore } from "@/stores/LanguageStore";
import { getThemeColorType } from "@/types/general";
import { SelectOptionTypeProps } from "@/types/option";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RadioButton } from "react-native-paper";
import Animated, {
  FadeIn,
  SlideInLeft,
  SlideInRight,
} from "react-native-reanimated";
import { Image } from "react-native-elements";
import Spacer from "@/components/shared/Spacer";
import EvtView from "@/components/EvtComponents/EvtView";

const SelectOption = (props: SelectOptionTypeProps) => {
  const isRTL = useLanguageStore((state) => state.isRTL);
  const [active, setActive] = useState(false);
  const { getThemeColor } = useBaseTheme();
  let textColor = props.option.textColor;
  let actionColor = props.option.actionColor;
  let noReverse = props.option.noReverse;
  const ImageSource =
    props.option.value == "971"
      ? require("@/assets/images/uae-flag.gif")
      : props.option.value == "46"
      ? require("@/assets/images/sw-flag.gif")
      : null;
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
        onPress={() => {
          props.option.pressed(props.option.value);
        }}
        style={[
          styles(getThemeColor).card,
          !active
            ? { backgroundColor: getThemeColor("onBackground") }
            : { backgroundColor: getThemeColor("placeholder") },
        ]}
        key={props.option.title}
      >
        <EvtView style={styles(getThemeColor).imageContainer}>
          <Image style={styles(getThemeColor).image} source={ImageSource} />
        </EvtView>
        <EvtStyledText.Body color={textColor}>
          {props.option.title}
        </EvtStyledText.Body>
        <Spacer flex />
        <RadioButton
          uncheckedColor={actionColor}
          color={actionColor}
          value={props.option.value}
          status={props.option.checked ? "checked" : "unchecked"}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};
export default SelectOption;

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
    },
    imageContainer: {
      marginRight: Sizes.padding.md,
      borderRadius: Sizes.border.radius.lg,
      overflow: "hidden",
    },
    image: {
      width: AppConstants.LARGE_FLAG_IMAGE_WIDTH,
      height: AppConstants.LARGE_FLAG_IMAGE_HEIGHT,
      borderRadius: Sizes.border.radius.lg,
      overflow: "hidden",
    },
  });

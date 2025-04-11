import EvtFontStyles from "@/assets/styles/EvtFontStyles";
import EvtStyles from "@/assets/styles/EvtStyles";
import GetIcon from "@/components/icons/GetIcon";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { useLanguageStore } from "@/stores/LanguageStore";
import { FabAnimationType, getThemeColorType } from "@/types/general";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const FabAnimation = ({
  title,
  icon,
  scrollY,
  handlePressFab,
}: FabAnimationType) => {
  const { getThemeColor } = useBaseTheme();
  const isRTL = useLanguageStore((state) => state.isRTL);

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      bottom: AppConstants.MEASURING_UNIT,
      right: AppConstants.MEASURING_UNIT,
      width:
        scrollY.value <= AppConstants.WINDOW_WIDTH / 5.5
          ? withSpring(130)
          : withSpring(60),
      // height: 60,
    };
  });

  const iconAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        scrollY.value <= AppConstants.WINDOW_WIDTH / 5.5
          ? withTiming(1)
          : withTiming(1),
      transform: [
        {
          translateX:
            scrollY.value <= AppConstants.WINDOW_WIDTH / 5.5
              ? withTiming(isRTL ? 45 : -45)
              : withTiming(0),
        },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        scrollY.value <= AppConstants.WINDOW_WIDTH / 5.5
          ? withTiming(1)
          : withTiming(0),
      display:
        scrollY.value <= AppConstants.WINDOW_WIDTH / 5.5 ? "flex" : "none",
      transform: [
        {
          translateX:
            scrollY.value <= AppConstants.WINDOW_WIDTH / 5.5
              ? withTiming(0)
              : withTiming(100),
        },
      ],
    };
  });

  return (
    <Animated.View style={buttonAnimationStyle}>
      <TouchableOpacity
        onPress={handlePressFab}
        style={styles(getThemeColor).shadowContainer}
      >
        <Animated.View style={iconAnimationStyle}>
          <GetIcon
            icon={icon}
            size={Sizes.icon.size.md}
            color={getThemeColor("buttonTitleColor")}
          />
        </Animated.View>
        <Animated.Text style={[styles(getThemeColor).text, textAnimationStyle]}>
          {title}
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
export default FabAnimation;
const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    shadowContainer: {
      borderRadius: Sizes.border.radius.md,
      shadowColor: getThemeColor("placeholder"),
      ...EvtStyles.components.cardShadow,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: AppConstants.MEASURING_UNIT / 2,
      paddingHorizontal: AppConstants.MEASURING_UNIT,
      backgroundColor: getThemeColor("tint"),
      flexWrap: "nowrap",
    },
    text: {
      position: "absolute",
      right: Sizes.padding.md,
      color: getThemeColor("buttonTitleColor"),
      ...EvtFontStyles.Body,
    },
  });

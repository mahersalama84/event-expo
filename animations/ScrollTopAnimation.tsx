import EvtStyles from "@/assets/styles/EvtStyles";
import GetIcon from "@/components/icons/GetIcon";
import { ArrowUpIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { ScrollTopAnimationType, getThemeColorType } from "@/types/general";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const ScrollTopAnimation = ({ scrollY, scrollTop }: ScrollTopAnimationType) => {
  const { getThemeColor } = useBaseTheme();

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

  return (
    <Animated.View style={buttonAnimationStyle}>
      <TouchableOpacity
        onPress={scrollTop}
        style={styles(getThemeColor).shadowContainer}
      >
        <Animated.View>
          <GetIcon
            icon={ArrowUpIcon}
            size={Sizes.icon.size.md}
            color={getThemeColor("buttonTitleColor")}
          />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};
export default ScrollTopAnimation;
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
  });

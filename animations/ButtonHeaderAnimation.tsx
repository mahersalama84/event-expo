import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { ButtonHeaderAnimationType } from "@/types/general";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const ButtonHeaderAnimation = ({
  scrollY,
  children,
}: ButtonHeaderAnimationType) => {
  const { getThemeColor } = useBaseTheme();
  const animatedColor = getThemeColor("onBackground");
  const buttonStyles = useAnimatedStyle(() => {
    return {
      backgroundColor:
        scrollY.value >= AppConstants.WINDOW_WIDTH / 5.5
          ? animatedColor
          : "tranparent",
      transform: [
        {
          scale:
            scrollY.value >= AppConstants.WINDOW_WIDTH / 5.5
              ? withSpring(1.0)
              : withSpring(1.3),
        },
        {
          rotate:
            scrollY.value <= 5
              ? withSequence(
                  withTiming("45deg", { duration: 100 }),
                  withTiming("-45deg", { duration: 100 }),
                  withTiming("45deg", { duration: 100 }),
                  withTiming("-45deg", { duration: 100 }),
                  withTiming("0deg", { duration: 100 })
                )
              : withSpring("0deg"),
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.button, buttonStyles]}>
      {children}
    </Animated.View>
  );
};
export default ButtonHeaderAnimation;

const styles = StyleSheet.create({
  button: {
    marginHorizontal: AppConstants.MEASURING_UNIT / 2,
    padding: Sizes.padding.md,
    borderRadius: Sizes.border.radius.xxl,
  },
});

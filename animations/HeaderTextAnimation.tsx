import AppConstants from "@/constants/AppConstants";
import { HeaderTextAnimationType } from "@/types/general";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const HeaderTextAnimation = ({
  scrollY,
  children,
}: HeaderTextAnimationType) => {
  const textStyles = useAnimatedStyle(() => ({
    opacity: scrollY.value >= AppConstants.SCROLL_THRESHOLD ? 1 : 0,
    transform: [
      {
        translateY:
          scrollY.value >= AppConstants.SCROLL_THRESHOLD
            ? withSpring(0)
            : withSpring(5),
      },
    ],
  }));
  return <Animated.View style={textStyles}>{children}</Animated.View>;
};
export default HeaderTextAnimation;

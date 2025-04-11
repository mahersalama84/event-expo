import AppConstants from "@/constants/AppConstants";
import { HomeHeaderAnimationType } from "@/types/general";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const HomeHeaderAnimation = ({
  scrollY,
  children,
}: HomeHeaderAnimationType) => {
  const headerStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [150, 250, 350],
        [
          0,
          AppConstants.HEADER_EXPANDED_HEIGHT / 1.5,
          AppConstants.HEADER_EXPANDED_HEIGHT,
        ],
        Extrapolation.CLAMP
      ),
      opacity: interpolate(
        scrollY.value,
        [0, 100, 200],
        [0.8, 0.9, 1],
        Extrapolation.CLAMP
      ),
    };
  });
  return <Animated.View style={headerStyles}>{children}</Animated.View>;
};
export default HomeHeaderAnimation;

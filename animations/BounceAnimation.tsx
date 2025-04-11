import { BounceAnimationType } from "@/types/general";
import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
} from "react-native-reanimated";

const BounceAnimation = ({
  children,
  MOVE_Y,
  direction,
}: BounceAnimationType) => {
  let translateValue = useSharedValue(0);
  let bounceValue = useSharedValue(1);
  const animateStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateZ: direction == "X" ? "90deg" : "0deg" },
        { translateY: translateValue.value },
        { scaleX: bounceValue.value },
      ],
    };
  });

  const startAnimation = () => {
    translateValue.value = withRepeat(
      withSpring(MOVE_Y, { duration: 1000 }, (finished) => {
        if (finished)
          bounceValue.value = withSequence(
            withSpring(1.2, { duration: 100 }),
            withSpring(1, { duration: 100 })
          );
      }),
      -1,
      true
    );
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return <Animated.View style={animateStyles}>{children}</Animated.View>;
};
export default BounceAnimation;

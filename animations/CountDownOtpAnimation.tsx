import { CountDownOtpAnimationType } from "@/types/general";
import Animated, {
  useAnimatedStyle,
  withSequence,
  withSpring,
} from "react-native-reanimated";

const CountDownOtpAnimation = ({
  children,
  valueChanged,
}: CountDownOtpAnimationType) => {
  const CounterAnimation = useAnimatedStyle(() => {
    return {
      opacity: valueChanged.value
        ? withSequence(
            withSpring(0, { duration: 100 }),
            withSpring(1, { duration: 800, dampingRatio: 0.1 }),
            withSpring(0, { duration: 100 })
          )
        : withSequence(
            withSpring(0, { duration: 100 }),
            withSpring(1, { duration: 800, dampingRatio: 0.1 }),
            withSpring(0, { duration: 100 })
          ),
      transform: [
        {
          translateY: valueChanged.value
            ? withSequence(
                withSpring(-20, { duration: 100 }),
                withSpring(0, {
                  duration: 800,
                  dampingRatio: 0.3,
                  restSpeedThreshold: 0.01,
                  // stiffness: 100,
                }),
                withSpring(20, { duration: 100 })
              )
            : withSequence(
                withSpring(-20, { duration: 100 }),
                withSpring(0, {
                  duration: 800,
                  dampingRatio: 0.3,
                  restSpeedThreshold: 0.01,
                  // stiffness: 100,
                }),
                withSpring(20, { duration: 100 })
              ),
        },
      ],
    };
  });

  return <Animated.View style={CounterAnimation}>{children}</Animated.View>;
};
export default CountDownOtpAnimation;

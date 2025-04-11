import { BottomTabIconAnimationType } from "@/types/general";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const BottomTabIconAnimation = ({
  children,
  focused,
}: BottomTabIconAnimationType) => {
  const iconStyles = useAnimatedStyle(() => {
    let _focused: number = focused ? 1 : 0;
    return {
      transform: [
        {
          scale: _focused ? withSpring(1) : withSpring(1.2),
        },
        {
          translateY: _focused ? withSpring(0) : withSpring(7),
        },
      ],
    };
  });

  return <Animated.View style={iconStyles}>{children}</Animated.View>;
};
export default BottomTabIconAnimation;

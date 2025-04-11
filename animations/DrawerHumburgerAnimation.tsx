import GetIcon from "@/components/icons/GetIcon";
import { DrawerIcon } from "@/components/icons/Icons";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { useLanguageStore } from "@/stores/LanguageStore";
import { useDrawerStatus } from "@react-navigation/drawer";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const DrawerHumburgerAnimation = () => {
  const { getThemeColor } = useBaseTheme();
  const DrawerStatus = useDrawerStatus();
  const isRTL = useLanguageStore((state) => state.isRTL);

  const iconStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate:
            DrawerStatus == "open"
              ? withTiming(isRTL ? "-45deg" : "45deg", { duration: 100 })
              : withTiming("0deg", { duration: 100 }),
        },
      ],
    };
  });
  return (
    <Animated.View style={iconStyles}>
      <GetIcon
        variant={DrawerStatus == "open" ? "Bulk" : "Bold"}
        icon={DrawerIcon}
        color={getThemeColor("tint")}
        size={Sizes.icon.size.xmd}
      />
    </Animated.View>
  );
};
export default DrawerHumburgerAnimation;

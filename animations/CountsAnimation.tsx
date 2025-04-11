import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import GetIcon from "@/components/icons/GetIcon";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { getThemeColorType } from "@/types/general";
import * as Iconsax from "iconsax-react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const CountsAnimation = ({
  scrollY,
  icon,
  iconColor,
  iconSize,
  title,
  value,
  index,
  handlePress,
}: {
  scrollY: SharedValue<number>;
  icon?: Iconsax.Icon;
  iconColor?: string;
  iconSize?: number;
  title: string;
  value: number | undefined;
  index: number;
  handlePress: () => void;
}) => {
  const { getThemeColor } = useBaseTheme();
  const countStyles = useAnimatedStyle(() => {
    return {
      opacity: scrollY.value >= AppConstants.SCROLL_THRESHOLD ? 1 : 1,
      transform: [
        {
          translateY:
            scrollY.value >= AppConstants.SCROLL_THRESHOLD
              ? withSpring(-20, { duration: 200 * index })
              : withSpring(-10),
        },
      ],
    };
  });
  return (
    <Animated.View style={countStyles}>
      <TouchableOpacity
        style={styles(getThemeColor).container}
        onPress={handlePress}
      >
        {icon && (
          <GetIcon
            style={styles(getThemeColor).icon}
            icon={icon}
            color={iconColor ?? getThemeColor("tint")}
            size={iconSize ?? Sizes.icon.size.md}
          />
        )}
        <EvtStyledText.Chip textAlign="center">
          {title} {value}
        </EvtStyledText.Chip>
      </TouchableOpacity>
    </Animated.View>
  );
};
export default CountsAnimation;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      //   justifyContent: "space-between",
      backgroundColor: getThemeColor("onBackground"),
      padding: Sizes.margin.md,
      marginEnd: Sizes.margin.md,
      borderRadius: Sizes.border.radius.md,
    },
    icon: {
      marginEnd: Sizes.margin.md / 2,
    },
  });

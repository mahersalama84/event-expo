import GetIcon from "@/components/icons/GetIcon";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { useLanguageStore } from "@/stores/LanguageStore";
import { CarouselButtonAnimationType } from "@/types/general";
import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const CarouselButtonAnimation = ({
  icon,
  title,
  dataLength,
  flatListIndex,
  flatListRef,
  x,
  handlePress,
}: CarouselButtonAnimationType) => {
  const isRTL = useLanguageStore((state) => state.isRTL);
  const { getThemeColor } = useBaseTheme();

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      // height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(isRTL ? 50 : -50)
              : withTiming(0),
        },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });
  const animatedColors = [
    getThemeColor("tint"),
    getThemeColor("tint"),
    getThemeColor("tint"),
  ];
  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, AppConstants.WINDOW_WIDTH, 2 * AppConstants.WINDOW_WIDTH],
      animatedColors
    );

    return {
      backgroundColor: backgroundColor,
    };
  });

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View
        style={[styles.container, buttonAnimationStyle, animatedColor]}
      >
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          {title}
        </Animated.Text>
        <Animated.View style={arrowAnimationStyle}>
          <GetIcon
            icon={icon}
            size={Sizes.icon.size.xsm}
            color={getThemeColor("buttonTitleColor")}
          />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default CarouselButtonAnimation;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: Sizes.border.radius.md,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  textButton: { color: "white", fontSize: 16, position: "absolute" },
});

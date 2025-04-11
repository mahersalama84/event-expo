import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { DotType, getThemeColorType } from "@/types/general";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

const DotAnimation = ({ index, x }: DotType) => {
  const { getThemeColor } = useBaseTheme();
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [
        (index - 1) * AppConstants.WINDOW_WIDTH,
        index * AppConstants.WINDOW_WIDTH,
        (index + 1) * AppConstants.WINDOW_WIDTH,
      ],
      [5, 10, 5],
      Extrapolation.CLAMP
    );

    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * AppConstants.WINDOW_WIDTH,
        index * AppConstants.WINDOW_WIDTH,
        (index + 1) * AppConstants.WINDOW_WIDTH,
      ],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation,
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
    <Animated.View
      style={[styles(getThemeColor).dots, animatedDotStyle, animatedColor]}
    />
  );
};

export default DotAnimation;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    dots: {
      height: Sizes.iconSize.xs,
      marginHorizontal: Sizes.margin.sm,
      borderRadius: Sizes.border.radius.xxl,
      backgroundColor: getThemeColor("tint"),
    },
  });

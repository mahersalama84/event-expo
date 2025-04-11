import AppConstants from "@/constants/AppConstants";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { SkeletonType } from "@/types/general";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import EvtView from "./EvtView";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const lightColors = ["#e9e9e9", "#efefef"];
const darkColors = ["#404040", "#464646"];

const EvtSkeleton = (props: SkeletonType) => {
  const { theme } = useBaseTheme();
  const usedColor = theme == "dark" ? darkColors : lightColors;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.quad,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-AppConstants.WINDOW_WIDTH, AppConstants.WINDOW_WIDTH],
  });

  return (
    <EvtView
      style={{
        overflow: "hidden",
        height: props.height,
        width:
          props.randomWidth && props.minWidth && props.maxWidth
            ? Math.floor(Math.random() * props.maxWidth) + props.minWidth
            : props.width,
        marginBottom: props.marginBottom,
        borderRadius: props.borderRadius || 3,
        ...props.style,
        backgroundColor: usedColor[0],
        borderColor: usedColor[1],
      }}
    >
      <AnimatedLinearGradient
        colors={[usedColor[0], usedColor[1], usedColor[1], usedColor[0]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ translateX: translateX }],
          },
        ]}
      />
    </EvtView>
  );
};

export default EvtSkeleton;

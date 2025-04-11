import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { DialogType, getThemeColorType } from "@/types/general";
import React, { useEffect, useState } from "react";
import { BackHandler, Pressable, StyleSheet } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInUp,
  SlideOutUp,
  useAnimatedStyle,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const DialogAnimation = (props: DialogType) => {
  const { getThemeColor } = useBaseTheme();
  const [contentHeight, setContentHeight] = useState(0);

  const translateY = useAnimatedStyle(() => {
    let reduceValue = 0;
    if (props.withoutCalculateBottomNavigationBar) reduceValue += 70;
    if (props.withouCalculatetAppBar) reduceValue += 70;
    if (props.withouCalculatetTabbar) reduceValue += 70;
    return {
      transform: [
        {
          translateY: -(
            (AppConstants.WINDOW_HEIGHT - reduceValue) / 2 -
            contentHeight / 2
          ),
        },
      ],
    };
  }, [
    contentHeight,
    props.withoutCalculateBottomNavigationBar,
    props.withouCalculatetAppBar,
    props.withouCalculatetTabbar,
    AppConstants.WINDOW_HEIGHT,
    props.visible,
  ]);

  useEffect(() => {
    const backHandler = () => {
      if (props.visible && props.onClose) props.onClose();
      return props.visible;
    };
    BackHandler.addEventListener("hardwareBackPress", backHandler);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backHandler);
    };
  }, [props.onClose, props.visible]);

  return props.visible ? (
    <>
      <AnimatedPressable
        entering={FadeIn}
        exiting={FadeOut}
        onPress={props.onClose}
        style={styles(getThemeColor).backDropPress}
      />
      <Animated.View
        entering={SlideInUp.springify().damping(15)}
        exiting={SlideOutUp}
        style={[
          styles(getThemeColor).dialog,
          translateY,
          props.bigMargin
            ? {
                left: AppConstants.MEASURING_UNIT * 2,
                right: AppConstants.MEASURING_UNIT * 2,
              }
            : null,
        ]}
        onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
      >
        {props.children}
      </Animated.View>
    </>
  ) : null;
};

export default DialogAnimation;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    backDropPress: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: getThemeColor("backdrop"),
      zIndex: AppConstants.LAYER_TOP,
    },
    dialog: {
      width: AppConstants.WINDOW_WIDTH - AppConstants.MEASURING_UNIT * 2,
      // borderWidth: 1,
      backgroundColor: getThemeColor("background"),
      position: "absolute",
      padding: AppConstants.MEASURING_UNIT,
      margin: AppConstants.MEASURING_UNIT,
      bottom: 0,
      borderRadius: Sizes.border.radius.md,
      overflow: "hidden",
      zIndex: AppConstants.LAYER_TOP,
    },
  });

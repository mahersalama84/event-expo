import EvtStyles from "@/assets/styles/EvtStyles";
import EvtView from "@/components/EvtComponents/EvtView";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { BaseBottomSheetType, getThemeColorType } from "@/types/general";
import React, { Fragment, useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const PressAnimated = Animated.createAnimatedComponent(Pressable);
const CLAMP = 100;

const BaseBottomSheet = (props: BaseBottomSheetType) => {
  const HEIGHT = props?.height ?? 300;

  const { getThemeColor } = useBaseTheme();
  const offset = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + offset.value;
      const clamp = Math.max(-CLAMP, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < HEIGHT / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(HEIGHT, {}, () => {
          runOnJS(props.backdropOnPress)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: offset.value,
        },
      ],
    };
  }, []);

  useEffect(() => {
    function onOpen() {
      if (props.isOpen) {
        offset.value = 0;
      }
    }

    onOpen();
  }, [props.isOpen]);

  if (!props.isOpen) {
    return <Fragment />;
  }
  return (
    <Fragment>
      <PressAnimated
        onPress={props.backdropOnPress}
        entering={FadeIn}
        exiting={FadeOut}
        style={styles(getThemeColor, HEIGHT).backdrop}
      />
      <GestureDetector gesture={panGesture}>
        <Animated.View
          entering={SlideInDown.springify().damping(15)}
          exiting={SlideOutDown}
          style={[styles(getThemeColor, HEIGHT).sheet, translateY]}
        >
          <EvtView style={styles(getThemeColor, HEIGHT).handleIndicatorStyle} />
          {props.children}
        </Animated.View>
      </GestureDetector>
    </Fragment>
  );
};

export default BaseBottomSheet;

const styles = (getThemeColor: getThemeColorType, HEIGHT: number) =>
  StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: getThemeColor("backdrop"),
      zIndex: AppConstants.LAYER_BACK,
    },
    sheet: {
      bottom: -CLAMP * 1.1,
      borderTopLeftRadius: Sizes.border.radius.lg,
      borderTopRightRadius: Sizes.border.radius.lg,
      padding: AppConstants.MEASURING_UNIT,
      width: "100%",
      height: HEIGHT,
      position: "absolute",
      zIndex: AppConstants.LAYER_BACK,
      backgroundColor: getThemeColor("background"),
    },
    handleIndicatorStyle: {
      flexDirection: "row",
      alignSelf: "center",
      marginBottom: AppConstants.MEASURING_UNIT,
      backgroundColor: getThemeColor("tint"),
      borderRadius: Sizes.border.radius.xxl,
      ...EvtStyles.components.handleIndicatorStyle,
    },
  });

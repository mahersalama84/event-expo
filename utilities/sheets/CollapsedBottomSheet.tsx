import EvtStyles from "@/assets/styles/EvtStyles";
import EvtView from "@/components/EvtComponents/EvtView";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { CollapsedBottomSheetType, getThemeColorType } from "@/types/general";
import React, {
  Fragment,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { Pressable, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  SlideInDown,
  SlideOutDown,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const PressAnimated = Animated.createAnimatedComponent(Pressable);
const CLAMP = 100;
// const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const INITIAL_POSITION = AppConstants.WINDOW_HEIGHT / 2;
const COLLAPSED_POSITION = AppConstants.WINDOW_HEIGHT / 4;

const MAX_TRANSLATE_Y = AppConstants.WINDOW_HEIGHT / 2;
const MIN_TRANSLATE_Y = AppConstants.WINDOW_HEIGHT / 10;

const CollapsedBottomSheet = forwardRef(
  (props: CollapsedBottomSheetType, ref) => {
    const { getThemeColor } = useBaseTheme();
    const translateY = useSharedValue(0);
    const context = useSharedValue({ y: 0 });

    const initial_position = props.position ? props.position : INITIAL_POSITION;
    const initial_collapse = props.collapse
      ? props.collapse
      : COLLAPSED_POSITION;
    const gesture = Gesture.Pan()
      .onStart((e) => {
        context.value = { y: translateY.value };
      })
      .onUpdate((e) => {
        // if (translateY.value < -MAX_TRANSLATE_Y + 100) return;
        translateY.value = e.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, -MAX_TRANSLATE_Y - 50);
      })
      .onEnd((e) => {
        if (translateY.value > -MIN_TRANSLATE_Y) {
          translateY.value = withSpring(initial_collapse);
        } else if (translateY.value < -MIN_TRANSLATE_Y) {
          translateY.value = withSpring(-MAX_TRANSLATE_Y);
        } else if (translateY.value > -MAX_TRANSLATE_Y) {
          translateY.value = withSpring(-MAX_TRANSLATE_Y);
        }
      });
    const bottomSheetStyle = useAnimatedStyle((e) => {
      return {
        transform: [{ translateY: translateY.value }],
      };
    });

    const backdropStyles = useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          translateY.value,
          [initial_collapse, -initial_position],
          [0, 1],
          Extrapolation.CLAMP
        ),
      };
    });
    const scrollTo = (destination: number) => {
      "worklet";
      translateY.value = withSpring(destination, { damping: 50 });
    };

    useEffect(() => {
      // Initial scroll to show the bottom sheet partially
      scrollTo(-initial_position);
    }, []);
    useImperativeHandle(ref, () => ({
      close: () => {
        scrollTo(AppConstants.WINDOW_HEIGHT);
      },
      open: () => {
        scrollTo(-initial_position);
      },
      collapse: () => {
        scrollTo(initial_collapse);
      },
    }));

    const closeSheetHandle = () => {
      scrollTo(AppConstants.WINDOW_HEIGHT);
    };

    const collapseSheetHandle = () => {
      scrollTo(initial_collapse);
    };
    return (
      <Fragment>
        <PressAnimated
          onPress={collapseSheetHandle}
          style={[styles(getThemeColor).backdrop, backdropStyles]}
        />
        <GestureDetector gesture={gesture}>
          <Animated.View
            entering={SlideInDown.springify().damping(15)}
            exiting={SlideOutDown}
            style={[
              styles(getThemeColor).sheet,
              bottomSheetStyle,
              { backgroundColor: props.backgroundColor },
            ]}
          >
            <EvtView style={styles(getThemeColor).handleIndicatorStyle} />
            {props.fixedHeader}
            {props.children}
          </Animated.View>
        </GestureDetector>
      </Fragment>
    );
  }
);

export default CollapsedBottomSheet;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: getThemeColor("backdrop"),
      zIndex: AppConstants.LAYER_BACK,
    },
    sheet: {
      // backgroundColor: getThemeColor("background"),
      borderTopLeftRadius: Sizes.border.radius.lg,
      borderTopRightRadius: Sizes.border.radius.lg,
      padding: AppConstants.MEASURING_UNIT,
      width: "100%",
      height: AppConstants.WINDOW_HEIGHT,
      position: "absolute",
      top: AppConstants.WINDOW_HEIGHT / 1.5,
      zIndex: AppConstants.LAYER_BACK,
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

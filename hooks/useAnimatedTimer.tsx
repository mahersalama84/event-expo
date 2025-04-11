import { useMemo } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";

type AnimatedTimer = {
  set: (callback: () => void, duration: number) => void;
  clear: () => void;
};

export function useAnimatedTimer(): AnimatedTimer {
  "worklet";
  const value = useSharedValue(0);

  return useMemo(
    () => ({
      clear: () => {
        "worklet";
        value.value = 0;
      },
      set: (callback: () => void, duration: number) => {
        "worklet";
        value.value = withTiming(1, { duration }, (completed) => {
          if (completed) {
            value.value = 0;
            callback();
          }
        });
      },
    }),
    [value]
  );
}

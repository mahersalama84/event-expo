import { TouchableType } from "@/types/general";
import { useEffect, useRef, useState } from "react";
import { Pressable } from "react-native";

const EvtTouchable = ({
  activeColor,
  style,
  children,
  handleSingleTap,
  handleDoubleTap,
}: TouchableType) => {
  const tap = useRef<number>(0);
  const timerRef = useRef<any>(null);

  const [active, setActive] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      tap.current = 0;
    }, 2000);
  }, [tap]);

  const TIMEOUT = 300;
  const debounce = (onSingle: () => void, onDouble: () => void) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      onDouble();
      handleDoubleTap ? handleDoubleTap() : null;
    } else {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        onSingle();
        handleSingleTap();
      }, TIMEOUT);
    }
  };
  const onSingleTap = () => (tap.current = 1);
  const onDoubleTap = () => (tap.current = 2);

  const onPress = () => {
    debounce(onSingleTap, onDoubleTap);
  };

  return (
    <Pressable
      style={[
        style,
        active ? { backgroundColor: activeColor, opacity: 0.5 } : {},
      ]}
      onPressIn={() => {
        setActive(true);
      }}
      onPressOut={() => setActive(false)}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};

export default EvtTouchable;

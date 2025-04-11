import EvtFontStyles from "@/assets/styles/EvtFontStyles";
import AppConstants from "@/constants/AppConstants";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { getThemeColorType, OtpType } from "@/types/general";
import React, { useEffect, useRef, useState } from "react";
import {
  I18nManager,
  Keyboard,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";

const EvtOtp = (props: OtpType) => {
  const { getThemeColor } = useBaseTheme();
  const arrayFromInputsCount = Array.from({ length: props.numberOfInputs });
  const refs = arrayFromInputsCount.map((e) => useRef<TextInput>());

  const [otp, setOtp] = useState<string[]>([]);

  const keyPressHandler = (
    nativeEvent: TextInputKeyPressEventData,
    index: number
  ) => {
    let newIndex = index;
    if (nativeEvent.key === "Backspace" && index > 0) {
      --newIndex;
    } else if (
      nativeEvent.key !== "Backspace" &&
      index < props.numberOfInputs - 1
    ) {
      ++newIndex;
    }
    refs[newIndex].current.focus();
  };

  const changeTextHandler = (text: string, index: number) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  useEffect(() => {
    if (
      otp.length === props.numberOfInputs &&
      otp.filter((e) => typeof e === "string" && e.trim().length === 1)
        .length === props.numberOfInputs
    ) {
      props.onFinish(otp.join(""));
      Keyboard.dismiss();
    }
  }, [otp]);

  return (
    <View style={styles(getThemeColor).mainContainer}>
      {arrayFromInputsCount.map((e, i) => (
        <TextInput
          autoFocus={i === 0 && props.autoFocus}
          style={styles(getThemeColor).input}
          key={i}
          ref={refs[i]}
          selectTextOnFocus
          onKeyPress={({ nativeEvent }) => keyPressHandler(nativeEvent, i)}
          onChangeText={(e) => changeTextHandler(e, i)}
          maxLength={1}
          keyboardType="numeric"
        />
      ))}
    </View>
  );
};

export default EvtOtp;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    mainContainer: {
      flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      paddingHorizontal: AppConstants.MEASURING_UNIT,
    },
    input: {
      ...EvtFontStyles.Body,
      direction: "ltr",
      textAlign: "center",
      color: getThemeColor("tint"),
      backgroundColor: getThemeColor("onBackground"),
      height: 56,
      width: 56,
      paddingHorizontal: 20,
      borderRadius: AppConstants.MEASURING_UNIT,
    },
  });

import EvtFontStyles from "@/assets/styles/EvtFontStyles";
import EvtStyles from "@/assets/styles/EvtStyles";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { useLanguageStore } from "@/stores/LanguageStore";
import { getThemeColorType, TextInputType } from "@/types/general";
import * as Iconsax from "iconsax-react-native";
import { TextInput as DefaultTextInput, StyleSheet } from "react-native";
import EvtStyledText from "./EvtStyledText";
import EvtView from "./EvtView";
import AppConstants from "@/constants/AppConstants";
import { ReactNode } from "react";

const EvtTextInput = (props: TextInputType) => {
  const { getThemeColor } = useBaseTheme();
  const isRTL = useLanguageStore((state) => state.isRTL);
  const { style, ...otherProps } = props;
  const backgroundColor = getThemeColor("onBackground");

  let PreffxIcon: Iconsax.Icon | null = props.prefixIcon
    ? props.prefixIcon.component
    : null;
  let PreffxIconColor: string | undefined = props.prefixIcon?.color
    ? props.prefixIcon.color
    : getThemeColor("tint");
  let PrefixText: string | null = props.prefixText ? props.prefixText : null;
  let PrefixAddHoc: ReactNode | null = props.prefixAddHoc
    ? props.prefixAddHoc
    : null;
  let PlaceholderTextColor: string | undefined = props.placeholderTextColor
    ? props.placeholderTextColor
    : getThemeColor("placeholder");
  return (
    <EvtView
      style={[
        styles(getThemeColor, isRTL, props.multiline, props.reverse)
          .shadowContainer,
        props.shadow
          ? {
              paddingLeft: AppConstants.SHADOW_WIDTH,
              paddingBottom: AppConstants.SHADOW_WIDTH,
            }
          : {},
      ]}
    >
      <EvtView
        style={[
          styles(getThemeColor, isRTL, props.multiline, props.reverse)
            .container,
          { backgroundColor },
        ]}
      >
        {PreffxIcon && (
          <PreffxIcon
            color={PreffxIconColor}
            size={Sizes.iconSize.xl}
            style={
              styles(getThemeColor, isRTL, props.multiline, props.reverse)
                .prefixIcon
            }
          />
        )}
        {PrefixText && (
          <EvtStyledText.Body
            color={getThemeColor("tint")}
            style={
              styles(getThemeColor, isRTL, props.multiline, props.reverse)
                .prefixTextStyle
            }
          >
            {props.prefixText}
          </EvtStyledText.Body>
        )}
        {PrefixAddHoc}
        <DefaultTextInput
          multiline={props.multiline ?? false}
          placeholderTextColor={PlaceholderTextColor}
          style={[
            style,
            {
              ...EvtStyles.components.input,
              textAlign: isRTL && !props.reverse ? "right" : "left",
              textAlignVertical: "center",
              color: getThemeColor("tint"),
              paddingVertical: Sizes.padding.md,
              ...EvtFontStyles.Body,
            },
          ]}
          {...otherProps}
        />
      </EvtView>
    </EvtView>
  );
};

export default EvtTextInput;

const styles = (
  getThemeColor: getThemeColorType,
  isRTL: boolean,
  multiline: boolean | undefined,
  reverse: boolean | undefined
) =>
  StyleSheet.create({
    shadowContainer: {
      shadowColor: getThemeColor("placeholder"),
      ...EvtStyles.components.cardShadow,
      alignItems: "center",
      marginBottom: Sizes.margin.md,
      borderRadius: Sizes.border.radius.xl,
    },
    container: {
      flexDirection: isRTL && reverse ? "row-reverse" : "row",
      alignItems: "center",
      borderRadius: Sizes.border.radius.xl,
    },
    prefixIcon: {
      marginStart: Sizes.margin.md,
      marginEnd: Sizes.margin.md,
      marginTop: multiline ? Sizes.margin.md : 0,
      alignSelf: multiline ? "flex-start" : "center",
    },
    prefixTextStyle: {
      marginRight: isRTL ? 0 : Sizes.margin.md,
      marginLeft: isRTL ? Sizes.margin.md : 0,
      ...EvtFontStyles.Body,
    },
  });

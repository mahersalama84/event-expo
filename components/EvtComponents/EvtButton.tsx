import EvtFontStyles from "@/assets/styles/EvtFontStyles";
import EvtStyles from "@/assets/styles/EvtStyles";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { ButtonType, getThemeColorType } from "@/types/general";
import { StyleSheet } from "react-native";
import { Button as DefaultButton } from "react-native-elements";
import EvtView from "./EvtView";

const EvtButton = (props: ButtonType) => {
  const { getThemeColor } = useBaseTheme();
  const { type, buttonStyle, disabledStyle, ...otherProps } = props;
  const backgroundColor = getThemeColor("buttonColor");
  const titleColor = getThemeColor("buttonTitleColor");
  const infoColor = getThemeColor("infoText");
  const tintTitleColor = getThemeColor("tint");
  const buttonDisabledColor = getThemeColor("placeholder");

  return (
    <EvtView
      style={[
        styles(getThemeColor).shadowContainer,
        props.shadow
          ? {
              paddingLeft: AppConstants.SHADOW_WIDTH,
              paddingBottom: AppConstants.SHADOW_WIDTH,
            }
          : {},
      ]}
    >
      <EvtView style={styles(getThemeColor).container}>
        <DefaultButton
          loadingStyle={{}}
          loadingProps={{
            size: "small",
            animating: true,
            color: type == "outline" ? tintTitleColor : titleColor,
          }}
          containerStyle={props.containerStyle}
          buttonStyle={[
            {
              ...EvtStyles.components.button,
              backgroundColor:
                type == "outline"
                  ? "transparent"
                  : type == "clear"
                  ? "transparent"
                  : backgroundColor,
              borderWidth: type == "outline" && !props.loading ? 1 : 0,
              borderColor: type == "outline" ? backgroundColor : "transparent",
            },
            buttonStyle,
          ]}
          disabledStyle={[
            { ...EvtStyles.components.button },
            props.disabledStyle ?? {
              backgroundColor: buttonDisabledColor,
              ...EvtStyles.components.button,
            },
          ]}
          disabledTitleStyle={{
            color: type == "outline" ? tintTitleColor : titleColor,
          }}
          titleStyle={{
            color:
              type == "outline"
                ? tintTitleColor
                : type == "clear"
                ? infoColor
                : titleColor,
            ...EvtFontStyles.Body,
            marginHorizontal: AppConstants.MEASURING_UNIT,
          }}
          {...otherProps}
        />
      </EvtView>
    </EvtView>
  );
};

export default EvtButton;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    shadowContainer: {
      shadowColor: getThemeColor("placeholder"),
      ...EvtStyles.components.cardShadow,
      // alignItems: "center",
      marginBottom: Sizes.margin.md,
      borderRadius: Sizes.border.radius.xl,
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: Sizes.border.radius.xl,
    },
  });

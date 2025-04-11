import EvtFontStyles from "@/assets/styles/EvtFontStyles";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { ColorValue, Text, TextProps } from "react-native";

type EvtStyledTextType = TextProps & {
  color?: ColorValue;
  textAlign?: "auto" | "left" | "right" | "center" | "justify" | undefined;
  textAlignVertical?: "auto" | "center" | "top" | "bottom" | undefined;
};

const EvtStyledText = (props: EvtStyledTextType) => {
  const { getThemeColor } = useBaseTheme();

  return (
    <Text
      {...props}
      style={[
        {
          color: props.color || getThemeColor("text"),
          textAlign: props.textAlign || "left",
          textAlignVertical: props.textAlignVertical || "center",
        },
        props.style,
      ]}
    />
  );
};

EvtStyledText.ScreenTitle = (props: EvtStyledTextType) => {
  return (
    <EvtStyledText
      {...props}
      style={[EvtFontStyles.ScreenTitle, props.style]}
    />
  );
};

EvtStyledText.SubScreenTitle = (props: EvtStyledTextType) => {
  return (
    <EvtStyledText
      {...props}
      style={[EvtFontStyles.SubScreenTitle, props.style]}
    />
  );
};

EvtStyledText.LayoutHeader = (props: EvtStyledTextType) => {
  return (
    <EvtStyledText
      {...props}
      style={[EvtFontStyles.LayoutHeader, props.style]}
    />
  );
};

EvtStyledText.Body = (props: EvtStyledTextType) => {
  return <EvtStyledText {...props} style={[EvtFontStyles.Body, props.style]} />;
};

EvtStyledText.BodyBold = (props: EvtStyledTextType) => {
  return (
    <EvtStyledText {...props} style={[EvtFontStyles.BodyBold, props.style]} />
  );
};

EvtStyledText.Chip = (props: EvtStyledTextType) => {
  return (
    <EvtStyledText {...props} style={[EvtFontStyles.Caption1, props.style]} />
  );
};

export default EvtStyledText;

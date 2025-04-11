import { useBaseTheme } from "@/context/BaseThemeContext";
import { TextType } from "@/types/general";
import { Text as DefaultText } from "react-native";

const EvtText = (props: TextType) => {
  const { getThemeColor } = useBaseTheme();
  const { style, ...otherProps } = props;
  let color = null;
  if (props.errorText) color = getThemeColor("errorText");
  else if (props.infoText) color = getThemeColor("infoText");
  else color = color = getThemeColor("text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};

export default EvtText;

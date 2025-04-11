import { useBaseTheme } from "@/context/BaseThemeContext";
import { SwitchType } from "@/types/general";
import { Switch as DefaultSwitch } from "react-native-elements";

const EvtSwitch = (props: SwitchType) => {
  const { getThemeColor } = useBaseTheme();
  const { style, ...otherProps } = props;
  const color = getThemeColor("tint");
  return <DefaultSwitch color={color} style={style} {...otherProps} />;
};

export default EvtSwitch;

import { useBaseTheme } from "@/context/BaseThemeContext";
import { ViewType } from "@/types/general";
import { View as DefaultView } from "react-native";

const EvtView = (props: ViewType) => {
  const { getThemeColor } = useBaseTheme();
  const { style, ...otherProps } = props;
  const backgroundColor = getThemeColor("background");

  return (
    <DefaultView
      style={[{ backgroundColor }, style, props.stretch ? { flex: 1 } : null]}
      {...otherProps}
    />
  );
};

export default EvtView;

import BottomTabIconAnimation from "@/animations/BottomTabIconAnimation";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { BottomTabIconType } from "@/types/general";

const BottomTabIcon = (props: BottomTabIconType) => {
  const { getThemeColor } = useBaseTheme();
  const Icon = props.icon;

  return (
    <BottomTabIconAnimation focused={props.focused}>
      <Icon
        {...props}
        color={
          props.focused ? getThemeColor("tint") : getThemeColor("placeholder")
        }
        variant={props.focused ? "Bulk" : "Linear"}
      />
    </BottomTabIconAnimation>
  );
};
export default BottomTabIcon;

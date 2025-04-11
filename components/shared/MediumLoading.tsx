import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { MediumLoadingType } from "@/types/general";
import { ActivityIndicator } from "react-native";

const MediumLoading = ({ style, color, size }: MediumLoadingType) => {
  const { getThemeColor } = useBaseTheme();
  return (
    <ActivityIndicator
      style={style ? style : null}
      size={size ?? Sizes.icon.size.md}
      color={color ?? getThemeColor("tint")}
    />
  );
};
export default MediumLoading;

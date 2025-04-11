import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { SmallLoadingType } from "@/types/general";
import { ActivityIndicator } from "react-native";

const SmallLoading = ({ style, color }: SmallLoadingType) => {
  const { getThemeColor } = useBaseTheme();
  return (
    <ActivityIndicator
      style={style ? style : null}
      size={Sizes.icon.size.sm}
      color={color ?? getThemeColor("tint")}
    />
  );
};

export default SmallLoading;

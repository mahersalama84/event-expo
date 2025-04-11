import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { LargeLoadingType } from "@/types/general";
import { ActivityIndicator } from "react-native";

const LargeLoading = ({ style }: LargeLoadingType) => {
  const { getThemeColor } = useBaseTheme();
  return (
    <ActivityIndicator
      style={style ? style : null}
      size={Sizes.icon.size.xxxl}
      color={getThemeColor("tint")}
    />
  );
};
export default LargeLoading;

import GetIcon from "@/components/icons/GetIcon";
import { AddSquareIcon } from "@/components/icons/Icons";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { AddSquareType } from "@/types/general";
import { TouchableOpacity } from "react-native-gesture-handler";

const AddSquare = (props: AddSquareType) => {
  const { getThemeColor } = useBaseTheme();
  return (
    <TouchableOpacity onPress={props.handlePress} style={props.style}>
      <GetIcon
        variant="Bulk"
        icon={AddSquareIcon}
        size={Sizes.icon.size.md}
        color={getThemeColor("tint")}
      />
    </TouchableOpacity>
  );
};
export default AddSquare;

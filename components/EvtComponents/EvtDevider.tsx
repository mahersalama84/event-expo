import AppConstants from "@/constants/AppConstants";
import { DeviderType } from "@/types/general";
import { View as DefaultView } from "react-native";

const EvtDevider = (props: DeviderType) => {
  return (
    <DefaultView
      style={{
        marginVertical: AppConstants.MEASURING_UNIT / 2,
        height: props.height,
        borderColor: props.color,
        borderBottomWidth: props.height,
      }}
    ></DefaultView>
  );
};

export default EvtDevider;

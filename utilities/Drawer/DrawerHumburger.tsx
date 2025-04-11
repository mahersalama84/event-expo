import DrawerHumburgerAnimation from "@/animations/DrawerHumburgerAnimation";
import AppConstants from "@/constants/AppConstants";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

const DrawerHumburger = () => {
  const { closeBaseBottomSheet } = useBaseBottomSheet();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ marginLeft: AppConstants.MEASURING_UNIT }}
      onPress={() => {
        closeBaseBottomSheet();
        navigation.dispatch(DrawerActions.toggleDrawer());
      }}
    >
      <DrawerHumburgerAnimation></DrawerHumburgerAnimation>
    </TouchableOpacity>
  );
};

export default DrawerHumburger;

import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtView from "@/components/EvtComponents/EvtView";
import { DangerIcon, SuccessIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { getThemeColorType } from "@/types/general";
import { StyleSheet } from "react-native";
import { ToastProps } from "react-native-toast-notifications/lib/typescript/toast";

const CustomToast = ({ toastOptions }: { toastOptions: ToastProps }) => {
  const { getThemeColor } = useBaseTheme();
  return (
    <EvtView
      style={[
        styles(getThemeColor).container,
        toastOptions.type == "success"
          ? { backgroundColor: getThemeColor("tint") }
          : { backgroundColor: getThemeColor("errorText") },
      ]}
    >
      {toastOptions.type == "success" ? <SuccessIcon /> : <DangerIcon />}
      <EvtStyledText.Chip
        color={getThemeColor("buttonTitleColor")}
        style={{ marginLeft: Sizes.margin.sm }}
      >
        {toastOptions.message}
      </EvtStyledText.Chip>
    </EvtView>
  );
};

export default CustomToast;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: AppConstants.TAB_BAR_HEIGHT + AppConstants.MEASURING_UNIT,
      // left: AppConstants.MEASURING_UNIT,
      paddingHorizontal: Sizes.padding.md,
      paddingVertical: Sizes.padding.sm,
      borderRadius: Sizes.border.radius.xxl,
    },
  });

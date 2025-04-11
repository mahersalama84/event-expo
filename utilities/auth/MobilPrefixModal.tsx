import i18n from "@/assets/lang/i18n";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { useMobilePrefixStore } from "@/stores/MobilePrefixStore";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import BaseBottomSheet from "../sheets/BaseBottomSheet";
import SelectOption from "./SelectOption";

const MobilePrefixModal = () => {
  const { isOpen, closeBaseBottomSheet } = useBaseBottomSheet();
  const { getThemeColor } = useBaseTheme();
  const mobilePrefix = useMobilePrefixStore((state) => state.mobilePrefix);
  const [value, setValue] = useState("");
  const setMobilePrefix = useMobilePrefixStore(
    (state) => state.setMobilePrefix
  );

  const options = [
    {
      key: "uae",
      value: "971",
      checked: mobilePrefix === "971",
      textColor: getThemeColor("text"),
      actionColor: getThemeColor("tint"),
      title: i18n.t("app.uae"),
      pressed: (value: string) => {
        setValue(value);
        setMobilePrefix(value);
        closeBaseBottomSheet();
      },
    },
    {
      key: "sweden",
      value: "46",
      checked: mobilePrefix === "46",
      textColor: getThemeColor("text"),
      actionColor: getThemeColor("tint"),
      title: i18n.t("app.sweden"),
      pressed: (value: string) => {
        setValue(value);
        setMobilePrefix(value);
        closeBaseBottomSheet();
      },
    },
  ];
  return (
    <BaseBottomSheet
      height={AppConstants.MOBILE_PREFIX_MODAL_HEIGHT}
      isOpen={isOpen}
      backdropOnPress={() => {
        closeBaseBottomSheet();
      }}
    >
      <EvtStyledText.SubScreenTitle style={{ marginBottom: Sizes.margin.md }}>
        {i18n.t("headers.selectCountry")}
      </EvtStyledText.SubScreenTitle>
      <ScrollView>
        {options.map((option) => (
          <SelectOption option={option} key={option.key} />
        ))}
      </ScrollView>
    </BaseBottomSheet>
  );
};
export default MobilePrefixModal;

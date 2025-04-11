import i18n from "@/assets/lang/i18n";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import { EyeIcon } from "@/components/icons/Icons";
import CardOption from "@/components/shared/CardOption";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { router } from "expo-router";
import React from "react";
import BaseBottomSheet from "../sheets/BaseBottomSheet";

const CustomerOptionsModal = () => {
  const { getThemeColor } = useBaseTheme();
  const { isOpen, closeBaseBottomSheet } = useBaseBottomSheet();

  const options = [
    {
      key: "viewOccasion",
      textColor: getThemeColor("text"),
      title: i18n.t("customers.viewProfile"),
      icon: EyeIcon,
      pressed: () => {
        closeBaseBottomSheet();
        router.push({
          pathname: "/customerDetails",
        });
      },
    },
  ];

  return (
    <BaseBottomSheet
      height={AppConstants.Customer_OPTIONS_MODAL_HEIGHT}
      isOpen={isOpen}
      backdropOnPress={() => {
        closeBaseBottomSheet();
      }}
    >
      <EvtStyledText.SubScreenTitle style={{ marginBottom: Sizes.margin.md }}>
        {i18n.t("headers.selectOption")}
      </EvtStyledText.SubScreenTitle>
      {options.map((option) => (
        <CardOption option={option} key={option.key} />
      ))}
    </BaseBottomSheet>
  );
};

export default CustomerOptionsModal;

import i18n from "@/assets/lang/i18n";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import {
  AddSquareIcon,
  EditIcon,
  EyeIcon,
  TrashIcon,
} from "@/components/icons/Icons";
import CardOption from "@/components/shared/CardOption";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { useConfirmStore } from "@/stores/ConfirmStore";
import { useMyOccasionsStore } from "@/stores/MyOccasionsStore";
import { useOtherOccasionsStore } from "@/stores/OtherOccasionsStore";
import { router } from "expo-router";
import React from "react";
import BaseBottomSheet from "../sheets/BaseBottomSheet";
import WishFormModal from "../wishes/WishFormModal";
import OccasionFormModal from "./OccasionFormModal";

const MyOccasionOptionsModal = () => {
  const { getThemeColor } = useBaseTheme();
  const { isOpen, closeBaseBottomSheet, openBaseBottomSheet } =
    useBaseBottomSheet();

  const selectedOccasion = useMyOccasionsStore(
    (state) => state.selectedOccasion
  );
  const needConfirm = useConfirmStore((state) => state.needConfirm);
  const clearOccasions = useOtherOccasionsStore(
    (state) => state.clearOccasions
  );

  const options = [
    {
      key: "viewOccasion",
      textColor: getThemeColor("text"),
      title: i18n.t("occasions.viewOccasion"),
      icon: EyeIcon,
      pressed: () => {
        // clearOccasions();
        closeBaseBottomSheet();
        router.replace({
          pathname: "/drawer/occasion",
        });
      },
    },
    {
      key: "editOccasion",
      textColor: getThemeColor("text"),
      title: i18n.t("occasions.editOccasion"),
      icon: EditIcon,
      pressed: () => {
        closeBaseBottomSheet();
        openBaseBottomSheet(<OccasionFormModal />);
      },
    },
    {
      key: "deleteOccasion",
      textColor: getThemeColor("text"),
      title: i18n.t("occasions.deleteOccasion"),
      icon: TrashIcon,
      pressed: () => {
        closeBaseBottomSheet();
        needConfirm(selectedOccasion?.id);
      },
    },
    {
      key: "addwish",
      textColor: getThemeColor("text"),
      title: i18n.t("wishes.addWish"),
      icon: AddSquareIcon,
      pressed: () => {
        closeBaseBottomSheet();
        openBaseBottomSheet(<WishFormModal />);
      },
    },
  ];

  return (
    <BaseBottomSheet
      height={AppConstants.MY_OCCASION_OPTIONS_MODAL_HEIGHT}
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

export default MyOccasionOptionsModal;

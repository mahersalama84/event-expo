import i18n from "@/assets/lang/i18n";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import {
  AddSquareIcon,
  EyeIcon,
  MinusSquareIcon,
} from "@/components/icons/Icons";
import CardOption from "@/components/shared/CardOption";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as occasionService from "@/services/occasion";
import { useOtherOccasionsStore } from "@/stores/OtherOccasionsStore";
import { useProfileStore } from "@/stores/ProfileStore";
import { router } from "expo-router";
import React, { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import BaseBottomSheet from "../sheets/BaseBottomSheet";

const OtherOccasionOptionsModal = () => {
  const { getThemeColor } = useBaseTheme();
  const toast = useToast();
  const { isOpen, closeBaseBottomSheet } = useBaseBottomSheet();

  const [attending, setAttending] = useState(false);

  const profile = useProfileStore((state) => state.profile);
  const selectedOccasion = useOtherOccasionsStore(
    (state) => state.selectedOccasion
  );
  const clearOccasions = useOtherOccasionsStore(
    (state) => state.clearOccasions
  );
  const pushAttendProfileId = useProfileStore(
    (state) => state.pushAttendProfileId
  );
  const popAttendProfileId = useProfileStore(
    (state) => state.popAttendProfileId
  );

  const pushAttendOccasionId = useOtherOccasionsStore(
    (state) => state.pushAttendOccasionId
  );
  const popAttendOccasionId = useOtherOccasionsStore(
    (state) => state.popAttendOccasionId
  );

  const attend = (occasion_id: string) => {
    setAttending(true);
    occasionService
      .attendApi(occasion_id)
      .then((response: any) => {
        if (response?.data?.attend) {
          pushAttendProfileId(occasion_id);
          pushAttendOccasionId(profile?.id);
        } else {
          popAttendProfileId(occasion_id);
          popAttendOccasionId(profile?.id);
        }
        setAttending(false);
        toast.show(response?.data?.message, { type: "success" });
      })
      .catch((err: any) => {
        setAttending(false);
        toast.show(err?.response?.data?.message, { type: "danger" });
      });
  };

  const options = [
    {
      key: "viewOccasion",
      textColor: getThemeColor("text"),
      title: i18n.t("occasions.viewOccasion"),
      icon: EyeIcon,
      pressed: () => {
        closeBaseBottomSheet();
        router.replace({
          pathname: "/drawer/occasion",
        });
      },
    },
    {
      key: "attendOccasion",
      textColor: getThemeColor("text"),
      title: profile?.attendence_ids.includes(selectedOccasion?.id)
        ? i18n.t("occasions.notAttend")
        : i18n.t("occasions.attend"),
      icon: profile?.attendence_ids.includes(selectedOccasion?.id)
        ? MinusSquareIcon
        : AddSquareIcon,
      loading: attending,
      pressed: () => {
        if (attending) return;
        closeBaseBottomSheet();
        attend(selectedOccasion?.id);
      },
    },
  ];

  return (
    <BaseBottomSheet
      height={AppConstants.OTHER_OCCASION_OPTIONS_MODAL_HEIGHT}
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

export default OtherOccasionOptionsModal;

import i18n from "@/assets/lang/i18n";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import { EyeIcon } from "@/components/icons/Icons";
import CardOption from "@/components/shared/CardOption";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as friendService from "@/services/friend";
import { useFollowersStore } from "@/stores/FollowerStore";
import { useOtherOccasionsStore } from "@/stores/OtherOccasionsStore";
import { useProfileStore } from "@/stores/ProfileStore";
import { router } from "expo-router";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import CustomersFunctions from "../CustomersFunctions";
import BaseBottomSheet from "../sheets/BaseBottomSheet";

const FollowerOptionsModal = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { getThemeColor } = useBaseTheme();
  const { isOpen, closeBaseBottomSheet } = useBaseBottomSheet();
  const clearOccasions = useOtherOccasionsStore(
    (state) => state.clearOccasions
  );
  const selectedFollower = useFollowersStore((state) => state.selectedFollower);
  const unselectFollower = useFollowersStore((state) => state.unSelectFollower);

  const pushAcceptedFollowerId = useProfileStore(
    (state) => state.pushAcceptedFollowerId
  );
  const popAcceptedFollowerId = useProfileStore(
    (state) => state.popAcceptedFollowerId
  );

  const handleProcessFollower = () => {
    setLoading(true);
    friendService
      .processFollowerApi(selectedFollower?.id)
      .then((response: any) => {
        setLoading(false);
        if (response?.data.accepted)
          pushAcceptedFollowerId(selectedFollower?.id);
        else popAcceptedFollowerId(selectedFollower?.id);
        toast.show(response?.data?.message, { type: "success" });
      })
      .catch((err: any) => {
        setLoading(false);
        toast.show(err?.response?.data?.message, { type: "danger" });
      });
  };

  const options = [
    {
      key: "viewProfile",
      textColor: getThemeColor("text"),
      title: i18n.t("customers.viewProfile"),
      icon: EyeIcon,
      pressed: () => {
        clearOccasions();
        closeBaseBottomSheet();
        router.replace({
          pathname: "/customerDetails",
        });
      },
    },
    {
      key: "proccessAccept",
      textColor: getThemeColor("text"),
      title: CustomersFunctions.FollowerTitle(selectedFollower?.id),
      icon: CustomersFunctions.FollowerIcon(selectedFollower?.id),
      iconVariant: "Bulk",
      loading: loading,
      pressed: handleProcessFollower,
    },
  ];

  return (
    <BaseBottomSheet
      height={AppConstants.FRIEND_MODAL_HEIGHT}
      isOpen={isOpen}
      backdropOnPress={() => {
        unselectFollower();
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

export default FollowerOptionsModal;

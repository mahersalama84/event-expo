import i18n from "@/assets/lang/i18n";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import { EyeIcon } from "@/components/icons/Icons";
import CardOption from "@/components/shared/CardOption";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as friendService from "@/services/friend";
import { useFollowingsStore } from "@/stores/FollowingStore";
import { useOtherOccasionsStore } from "@/stores/OtherOccasionsStore";
import { useProfileStore } from "@/stores/ProfileStore";
import { router } from "expo-router";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import CustomersFunctions from "../CustomersFunctions";
import BaseBottomSheet from "../sheets/BaseBottomSheet";

const FollowingOptionsModal = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { getThemeColor } = useBaseTheme();
  const { isOpen, closeBaseBottomSheet } = useBaseBottomSheet();
  const clearOccasions = useOtherOccasionsStore(
    (state) => state.clearOccasions
  );
  const selectedFollowing = useFollowingsStore(
    (state) => state.selectedFollowing
  );
  const unselectFollowing = useFollowingsStore(
    (state) => state.unSelectFollowing
  );

  const pushFollowingId = useProfileStore((state) => state.pushFollowingId);
  const popFollowingId = useProfileStore((state) => state.popFollowingId);

  const handleProcessFollow = () => {
    setLoading(true);
    friendService
      .followApi(selectedFollowing?.id)
      .then((response: any) => {
        if (response?.data?.follow) {
          pushFollowingId(selectedFollowing?.id);
        } else {
          popFollowingId(selectedFollowing?.id);
        }
        setLoading(false);
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
      key: "follow",
      textColor: getThemeColor("text"),
      title: CustomersFunctions.FollowingTitle(selectedFollowing?.id),
      icon: CustomersFunctions.FollowingIcon(selectedFollowing?.id),
      loading: loading,
      pressed: handleProcessFollow,
    },
  ];

  return (
    <BaseBottomSheet
      height={AppConstants.FRIEND_MODAL_HEIGHT}
      isOpen={isOpen}
      backdropOnPress={() => {
        unselectFollowing();
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

export default FollowingOptionsModal;

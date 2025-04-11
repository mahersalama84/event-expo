import i18n from "@/assets/lang/i18n";
import EvtStyles from "@/assets/styles/EvtStyles";
import EvtButton from "@/components/EvtComponents/EvtButton";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import Spacer from "@/components/shared/Spacer";
import AppConstants from "@/constants/AppConstants";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import * as wishService from "@/services/wish";
import { useMyWishesStore } from "@/stores/MyWishesStore";
import { useEffect, useState } from "react";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { useToast } from "react-native-toast-notifications";
import BaseBottomSheet from "../sheets/BaseBottomSheet";

const UnBookWishModal = () => {
  const toast = useToast();

  const selectedWish = useMyWishesStore((state) => state.selectedWish);
  const selectWish = useMyWishesStore((state) => state.selectWish);
  const editWish = useMyWishesStore((state) => state.editWish);

  const { isOpen, closeBaseBottomSheet } = useBaseBottomSheet();
  useEffect(() => {
    if (selectedWish) {
    }
  }, [selectedWish]);

  const [booking, setBooking] = useState<boolean>(false);

  const bookWishHandle = () => {
    setBooking(true);
    wishService
      .bookWishApi(selectedWish?.id, false, "")
      .then((response: any) => {
        setBooking(false);
        editWish(response?.data?.wish);
        selectWish(response?.data.wish);
        toast.show(response?.data?.message, { type: "success" });
        closeBaseBottomSheet();
      })
      .catch((error) => {
        setBooking(false);
        toast.show(error?.response?.data?.message, { type: "danger" });
      });
  };
  // renders
  return (
    <BaseBottomSheet
      height={AppConstants.UNBOOK_WISH_MODAL_HEIGHT}
      isOpen={isOpen}
      backdropOnPress={() => {
        closeBaseBottomSheet();
      }}
    >
      <EvtStyledText.SubScreenTitle>
        {i18n.t("wishes.unBookWish")}
      </EvtStyledText.SubScreenTitle>

      <Spacer height={AppConstants.MEASURING_UNIT * 3} />

      <Animated.View
        entering={SlideInDown.springify().damping(15)}
        exiting={SlideOutDown.springify().damping(15)}
      >
        <EvtButton
          containerStyle={{ flex: 1, ...EvtStyles.components.button }}
          title={i18n.t("wishes.unBookWish")}
          loading={booking}
          disabled={booking}
          iconPosition="right"
          onPress={bookWishHandle}
        />
      </Animated.View>
    </BaseBottomSheet>
  );
};

export default UnBookWishModal;

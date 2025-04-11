import i18n from "@/assets/lang/i18n";
import EvtStyles from "@/assets/styles/EvtStyles";
import EvtButton from "@/components/EvtComponents/EvtButton";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtSwitch from "@/components/EvtComponents/EvtSwitch";
import EvtTextInput from "@/components/EvtComponents/EvtTextInput";
import EvtView from "@/components/EvtComponents/EvtView";
import { TextIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as wishService from "@/services/wish";
import { useMyWishesStore } from "@/stores/MyWishesStore";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { useToast } from "react-native-toast-notifications";
import BaseBottomSheet from "../sheets/BaseBottomSheet";

const BookWishModal = () => {
  const { getThemeColor } = useBaseTheme();
  const toast = useToast();

  const selectedWish = useMyWishesStore((state) => state.selectedWish);
  const selectWish = useMyWishesStore((state) => state.selectWish);
  const editWish = useMyWishesStore((state) => state.editWish);

  const { isOpen, closeBaseBottomSheet } = useBaseBottomSheet();
  useEffect(() => {
    if (selectedWish) {
    }
  }, [selectedWish]);

  const [show, setShow] = useState<boolean>(true);
  const [note, setNote] = useState<string>("");
  const [booking, setBooking] = useState<boolean>(false);

  const bookWishHandle = () => {
    setBooking(true);
    wishService
      .bookWishApi(selectedWish?.id, show, note)
      .then((response: any) => {
        setBooking(false);
        editWish(response?.data?.wish);
        selectWish(response?.data.wish);
        toast.show(response?.data?.message, { type: "success" });
        closeBaseBottomSheet();
      })
      .catch((error: any) => {
        setBooking(false);
        toast.show(error?.response?.data?.message, { type: "danger" });
      });
  };
  // renders
  return (
    <BaseBottomSheet
      height={AppConstants.BOOK_WISH_MODAL_HEIGHT}
      isOpen={isOpen}
      backdropOnPress={() => {
        closeBaseBottomSheet();
      }}
    >
      <EvtStyledText.SubScreenTitle>
        {i18n.t("wishes.bookWish")}
      </EvtStyledText.SubScreenTitle>

      <EvtView style={styles.switchContainer}>
        <EvtStyledText.Body>{i18n.t("wishes.showWish")}</EvtStyledText.Body>
        <EvtSwitch
          value={show}
          onValueChange={(value) => {
            setShow(value);
          }}
        />
      </EvtView>
      <EvtTextInput
        shadow={true}
        multiline
        placeholder={i18n.t("forms.note")}
        onChangeText={setNote}
        value={note}
        prefixIcon={{ component: TextIcon }}
        maxLength={30}
      />
      <Animated.View
        entering={SlideInDown.springify().damping(15)}
        exiting={SlideOutDown.springify().damping(15)}
      >
        <EvtButton
          containerStyle={{ flex: 1, ...EvtStyles.components.button }}
          title={i18n.t("wishes.bookWish")}
          loading={booking}
          disabled={booking}
          iconPosition="right"
          onPress={bookWishHandle}
        />
      </Animated.View>
    </BaseBottomSheet>
  );
};

export default BookWishModal;

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

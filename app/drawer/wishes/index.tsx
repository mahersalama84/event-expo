import i18n from "@/assets/lang/i18n";
import EvtConfirmDialog from "@/components/EvtComponents/EvtConfirmDialog";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtView from "@/components/EvtComponents/EvtView";
import { CustomersIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as wishService from "@/services/wish";
import { useConfirmStore } from "@/stores/ConfirmStore";
import { useMyOccasionsStore } from "@/stores/MyOccasionsStore";
import { useMyWishesStore } from "@/stores/MyWishesStore";
import { getThemeColorType } from "@/types/general";
import VerticalListGesture from "@/utilities/lists/VerticalListGesture";
import AttendeItem from "@/utilities/occasions/AttendeItem";
import CollapsedBottomSheet from "@/utilities/sheets/CollapsedBottomSheet";
import CarouselWishes from "@/utilities/wishes/CarouselWishes";
import WishFixedHeader from "@/utilities/wishes/WishFixedHeader";
import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { useToast } from "react-native-toast-notifications";

const WishesDrawerScreen = () => {
  const { getThemeColor } = useBaseTheme();
  const { BaseBottomSheet } = useBaseBottomSheet();

  const selectOccasion = useMyOccasionsStore((state) => state.selectOccasion);

  const selectedWish = useMyWishesStore((state) => state.selectedWish);
  const selectWish = useMyWishesStore((state) => state.selectWish);
  const unSelectWish = useMyWishesStore((state) => state.unSelectWish);
  const storedWishes = useMyWishesStore((state) => state.storedWishes);
  const popWish = useMyWishesStore((state) => state.popWish);

  const toast = useToast();

  const which = useConfirmStore((state) => state.which);
  const clearConfirm = useConfirmStore((state) => state.clearConfirm);

  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const bottomSheetRef = useRef(null);
  const closeBottomSheet = () => {
    bottomSheetRef?.current.close();
  };

  const deleteWishHandle = () => {
    setDeleting(true);
    wishService
      .deleteWishApi(which)
      .then((response: any) => {
        const found = storedWishes.findIndex(
          (wish) => wish?.id == selectedWish?.id
        );
        if (storedWishes[found + 1]) selectWish(storedWishes[found + 1]);
        else if (storedWishes[found - 1]) selectWish(storedWishes[found - 1]);
        else unSelectWish();
        selectOccasion(response.data.occasion);
        popWish(which);
        toast.show(response?.data?.message, { type: "success" });
        setDeleting(false);
        clearConfirm();
        setConfirmDeleteVisible(false);
      })
      .catch((error) => {
        setDeleting(false);
        toast.show(error?.response?.data?.message, { type: "danger" });
      });
  };
  useEffect(() => {
    if (which) {
      setConfirmDeleteVisible(true);
    }
  }, [which]);
  return (
    <>
      {storedWishes.length > 0 && (
        <CollapsedBottomSheet
          backgroundColor={getThemeColor("onBackground")}
          fixedHeader={
            <WishFixedHeader backgroundColor={getThemeColor("onBackground")} />
          }
          ref={bottomSheetRef}
          collapse={AppConstants.WINDOW_HEIGHT / 7}
        >
          <EvtView style={styles(getThemeColor).detailescontainer}>
            {selectedWish?.description && (
              <EvtStyledText.Body>
                {selectedWish.description}
              </EvtStyledText.Body>
            )}
          </EvtView>
          <VerticalListGesture
            finish={true}
            backgroundColor={getThemeColor("onBackground")}
            numColumns={2}
            datasource={selectedWish ? selectedWish.customers : []}
            contentContainerStyle={styles(getThemeColor).customersContainer}
            renderItem={({ item }) => <AttendeItem item={item} shadow={true} />}
            emptyIcon={CustomersIcon}
            emptyText={i18n.t("app.notFound")}
            emptyTextDescription={i18n.t("occasions.notFoundAttendence")}
          />
        </CollapsedBottomSheet>
      )}

      <CarouselWishes />
      {BaseBottomSheet}
      <EvtConfirmDialog
        confirming={deleting}
        setConfirming={setDeleting}
        message={i18n.t("forms.deleteConfirm")}
        subMessage={i18n.t("wishes.deleteDialogMessage")}
        visible={confirmDeleteVisible}
        confirmed={deleteWishHandle}
        closed={() => {
          clearConfirm();
          setConfirmDeleteVisible(false);
        }}
        confirmButtonText={i18n.t("forms.delete")}
        confirmButtonColor={getThemeColor("errorText")}
      />
    </>
  );
};

export default WishesDrawerScreen;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    detailescontainer: {
      backgroundColor: getThemeColor("onBackground"),
      justifyContent: "center",
    },
    customersContainer: {
      backgroundColor: getThemeColor("onBackground"),
      paddingVertical: AppConstants.MEASURING_UNIT,
      paddingBottom: AppConstants.WINDOW_HEIGHT / 3.5,
    },
  });

import FabAnimation from "@/animations/FabAnimation";
import ProfileHeaderAnimation from "@/animations/ProfileHeaderAnimation";
import i18n from "@/assets/lang/i18n";
import EvtConfirmDialog from "@/components/EvtComponents/EvtConfirmDialog";
import { AddSquareIcon, CustomersIcon } from "@/components/icons/Icons";
import Spacer from "@/components/shared/Spacer";
import AppConstants from "@/constants/AppConstants";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as customerService from "@/services/customer";
import * as occasionService from "@/services/occasion";
import { useConfirmStore } from "@/stores/ConfirmStore";
import { useMyOccasionsStore } from "@/stores/MyOccasionsStore";
import { useOtherOccasionsStore } from "@/stores/OtherOccasionsStore";
import VerticalList from "@/utilities/lists/VerticalList";
import OccasionFormModal from "@/utilities/occasions/OccasionFormModal";
import MyOccasionItem from "@/utilities/profile/MyOccasionItem";
import MyOccasionItemSkeleton from "@/utilities/profile/MyOccasionItemSkeleton";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useToast } from "react-native-toast-notifications";

const ProfileScreen = () => {
  const { getThemeColor } = useBaseTheme();
  const toast = useToast();
  const { BaseBottomSheet, openBaseBottomSheet } = useBaseBottomSheet();

  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const storeOccasions = useMyOccasionsStore((state) => state.storeOccasions);
  const clearOccasions = useMyOccasionsStore((state) => state.clearOccasions);
  const storedOccasions = useMyOccasionsStore((state) => state.storedOccasions);
  const popOccasion = useMyOccasionsStore((state) => state.popOccasion);

  const unSelectMyOccasion = useMyOccasionsStore(
    (state) => state.unSelectOccasion
  );

  const unSelectOtherOccasion = useOtherOccasionsStore(
    (state) => state.unSelectOccasion
  );

  const which = useConfirmStore((state) => state.which);
  const clearConfirm = useConfirmStore((state) => state.clearConfirm);

  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finish, setFinish] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  useEffect(() => {
    let Mounted = true;
    // if (currentPage === 1) {
    //   clearOccasions();
    // }
    currentPage === 1 ? setRefreshing(true) : setLoading(true);
    customerService
      .myOccasionsApi(AppConstants.PER_PAGE, currentPage)
      .then((response: any) => {
        if (Mounted) {
          if (
            response?.data.length === 0 ||
            response?.data.length < AppConstants.PER_PAGE
          )
            setFinish(true);

          if (response?.data.length > 0) {
            storeOccasions([...storedOccasions, ...response?.data]);
          }

          currentPage === 1 ? setRefreshing(false) : setLoading(false);
        }
      })
      .catch((err: any) => {
        if (Mounted) {
          setFinish(true);
          currentPage === 1 ? setRefreshing(false) : setLoading(false);
          toast.show(err?.response?.data?.message, { type: "danger" });
        }
      });
    return () => {
      Mounted = false;
    };
  }, [currentPage]);
  useEffect(() => {
    if (which) {
      setConfirmDeleteVisible(true);
    }
  }, [which]);

  const deleteOccasion = async () => {
    try {
      setDeleting(true);
      const response: any = await occasionService.deleteOccasionApi(which);
      toast.show(response?.data?.message, { type: "success" });
      popOccasion(which);
      setDeleting(false);
      clearConfirm();
      setConfirmDeleteVisible(false);
    } catch (error: any) {
      toast.show(error?.response?.data?.message, { type: "danger" });
      setDeleting(false);
    }
  };

  const handlePressFab = () => {
    unSelectMyOccasion();
    unSelectOtherOccasion();
    openBaseBottomSheet(<OccasionFormModal />);
  };
  return (
    <>
      <ProfileHeaderAnimation scrollY={scrollY} />
      <Spacer height={AppConstants.MEASURING_UNIT} />
      <VerticalList
        gap={AppConstants.SHADOW_WIDTH}
        finish={finish}
        numColumns={2}
        onScroll={scrollHandler}
        contentContainerStyle={styles.main}
        datasource={storedOccasions}
        refreshing={refreshing}
        loading={loading}
        onEndReached={() => {
          if (!finish && !loading && !refreshing)
            setCurrentPage((prev) => prev + 1);
        }}
        renderItem={({ item }) => <MyOccasionItem item={item} shadow={true} />}
        renderSkeleton={() => <MyOccasionItemSkeleton shadow={true} />}
        emptyIcon={CustomersIcon}
        emptyText={i18n.t("app.notFound")}
        emptyTextDescription={i18n.t("occasions.notFoundOccasions")}
      />
      <FabAnimation
        scrollY={scrollY}
        handlePressFab={handlePressFab}
        title={i18n.t("occasions.addOccasion")}
        icon={AddSquareIcon}
      />
      <EvtConfirmDialog
        confirming={deleting}
        setConfirming={setDeleting}
        message={i18n.t("forms.deleteConfirm")}
        subMessage={i18n.t("occasions.deleteDialogMessage")}
        visible={confirmDeleteVisible}
        confirmed={deleteOccasion}
        closed={() => {
          clearConfirm();
          setConfirmDeleteVisible(false);
        }}
        confirmButtonText={i18n.t("forms.delete")}
        confirmButtonColor={getThemeColor("errorText")}
      />
      {BaseBottomSheet}
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: AppConstants.SHADOW_WIDTH,
  },
});

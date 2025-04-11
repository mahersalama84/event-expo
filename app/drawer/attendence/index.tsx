import i18n from "@/assets/lang/i18n";
import { CustomersIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as occasionService from "@/services/occasion";
import { useMyOccasionsStore } from "@/stores/MyOccasionsStore";
import { useOtherOccasionsStore } from "@/stores/OtherOccasionsStore";
import { getThemeColorType } from "@/types/general";
import VerticalList from "@/utilities/lists/VerticalList";
import AttendeItem from "@/utilities/occasions/AttendeItem";
import AttendeItemSkeleton from "@/utilities/occasions/AttendeItemSkeleton";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useToast } from "react-native-toast-notifications";

const AttendenceDrawerScreen = () => {
  const { getThemeColor } = useBaseTheme();
  const toast = useToast();
  const { BaseBottomSheet } = useBaseBottomSheet();
  const myOccasion = useMyOccasionsStore((state) => state.selectedOccasion);
  const otherOccasion = useOtherOccasionsStore(
    (state) => state.selectedOccasion
  );
  const selectedOccasion = myOccasion?.id ? myOccasion : otherOccasion;

  const [attendence, setAttendence] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finish, setFinish] = useState(false);
  useEffect(() => {
    let Mounted = true;
    if (currentPage === 1) {
      setAttendence([]);
    }
    currentPage === 1 ? setRefreshing(true) : setLoading(true);

    occasionService
      .paginateAttendenceApi(
        selectedOccasion?.id,
        AppConstants.PER_PAGE * 2,
        currentPage
      )
      .then((response: any) => {
        if (Mounted) {
          if (
            response?.data.length === 0 ||
            response?.data.length < AppConstants.PER_PAGE * 2
          )
            setFinish(true);

          if (response?.data.length > 0) {
            setAttendence((prev) => [...prev, ...response?.data]);
          }
          currentPage === 1 ? setRefreshing(false) : setLoading(false);
        }
      })
      .catch((err: any) => {
        if (Mounted) {
          currentPage === 1 ? setRefreshing(false) : setLoading(false);
          setFinish(true);
          toast.show(err?.response?.data?.message, { type: "danger" });
        }
      });
    return () => {
      Mounted = false;
    };
  }, [currentPage]);

  return (
    <>
      <VerticalList
        finish={finish}
        numColumns={2}
        datasource={attendence}
        refreshing={refreshing}
        loading={loading}
        contentContainerStyle={styles(getThemeColor).attendenceContainer}
        onEndReached={() => {
          if (!finish && !loading && !refreshing)
            setCurrentPage((prev) => prev + 1);
        }}
        onRefresh={() => {
          setCurrentPage(1);
        }}
        renderItem={({ item }) => <AttendeItem item={item} shadow={true} />}
        renderSkeleton={() => <AttendeItemSkeleton shadow={true} />}
        skeletonArrayLength={20}
        emptyIcon={CustomersIcon}
        emptyText={i18n.t("app.notFound")}
        emptyTextDescription={i18n.t("occasions.notFoundAttendence")}
      />
      {BaseBottomSheet}
    </>
  );
};

export default AttendenceDrawerScreen;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    scrollView: {
      backgroundColor: getThemeColor("onBackground"),
      flex: 1,
      borderTopLeftRadius: Sizes.border.radius.lg,
      borderTopRightRadius: Sizes.border.radius.lg,
    },
    attendenceContainer: {
      backgroundColor: getThemeColor("background"),
      paddingVertical: AppConstants.MEASURING_UNIT,
    },
  });

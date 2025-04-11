import i18n from "@/assets/lang/i18n";
import { OccasionsIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import * as occasionService from "@/services/occasion";
import VerticalList from "@/utilities/lists/VerticalList";
import OccasionItem from "@/utilities/occasions/OccasionItem";
import OccasionItemSkeleton from "@/utilities/occasions/OccasionItemSkeleton";
import BaseScreen from "@/utilities/screens/BaseScreen";
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";

const OccasionsScreen = () => {
  const { BaseBottomSheet } = useBaseBottomSheet();
  const toast = useToast();

  const [currentPage, setCurrentPage] = useState(1);
  const [occasions, setOccasions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finish, setFinish] = useState(false);

  useEffect(() => {
    let Mounted = true;
    currentPage === 1 ? setRefreshing(true) : setLoading(true);
    occasionService
      .paginateOccasionsApi(AppConstants.PER_PAGE, currentPage)
      .then((response: any) => {
        if (Mounted) {
          if (
            response?.data.length === 0 ||
            response?.data.length < AppConstants.PER_PAGE
          )
            setFinish(true);

          if (response?.data.length > 0)
            setOccasions((prev) => [...prev, ...response?.data]);

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
  return (
    <>
      <BaseScreen screenText={i18n.t("occasions.occasions")} paddingTopOfScreen>
        <VerticalList
          finish={finish}
          datasource={occasions}
          refreshing={refreshing}
          loading={loading}
          onEndReached={() => {
            if (!finish && !loading && !refreshing)
              setCurrentPage((prev) => prev + 1);
          }}
          renderItem={({ item }) => <OccasionItem item={item} shadow={true} />}
          renderSkeleton={() => <OccasionItemSkeleton shadow={true} />}
          onRefresh={() => {
            if (currentPage > 1) {
              setOccasions([]);
              setRefreshing(true);
              setCurrentPage(1);
              setFinish(false);
            }
          }}
          emptyIcon={OccasionsIcon}
          emptyText={i18n.t("app.notFound")}
          emptyTextDescription={i18n.t("occasions.notFoundOccasions")}
        />
      </BaseScreen>
      {BaseBottomSheet}
    </>
  );
};

export default OccasionsScreen;

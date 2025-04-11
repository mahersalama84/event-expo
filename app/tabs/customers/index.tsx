import i18n from "@/assets/lang/i18n";
import { CustomersIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import * as customerService from "@/services/customer";
import CustomerItem from "@/utilities/customers/CustomerItem";
import CustomerItemSkeleton from "@/utilities/customers/CustomerItemSkeleton";
import VerticalList from "@/utilities/lists/VerticalList";
import BaseScreen from "@/utilities/screens/BaseScreen";
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";

const CustomersScreen = () => {
  const toast = useToast();
  const { BaseBottomSheet } = useBaseBottomSheet();

  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finish, setFinish] = useState(false);

  useEffect(() => {
    let Mounted = true;
    currentPage === 1 ? setRefreshing(true) : setLoading(true);
    customerService
      .paginateCustomersApi(AppConstants.PER_PAGE, currentPage)
      .then((response: any) => {
        if (Mounted) {
          if (
            response?.data?.length === 0 ||
            response?.data?.length < AppConstants.PER_PAGE
          )
            setFinish(true);

          if (response?.data.length > 0)
            setCustomers((prev) => [...prev, ...response?.data]);

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
      <BaseScreen screenText={i18n.t("headers.customers")} paddingTopOfScreen>
        <VerticalList
          finish={finish}
          datasource={customers}
          refreshing={refreshing}
          loading={loading}
          onEndReached={() => {
            if (!finish && !loading && !refreshing)
              setCurrentPage((prev) => prev + 1);
          }}
          renderItem={({ item }) => <CustomerItem item={item} shadow={true} />}
          renderSkeleton={() => <CustomerItemSkeleton shadow={true} />}
          onRefresh={() => {
            if (currentPage > 1) {
              setCustomers([]);
              setRefreshing(true);
              setCurrentPage(1);
              setFinish(false);
            }
          }}
          emptyIcon={CustomersIcon}
          emptyText={i18n.t("app.notFound")}
          emptyTextDescription={i18n.t("customers.notFoundCustomers")}
        />
      </BaseScreen>
      {BaseBottomSheet}
    </>
  );
};

export default CustomersScreen;

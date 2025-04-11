import EvtTextInput from "@/components/EvtComponents/EvtTextInput";
import { CustomersIcon, SearchIcon } from "@/components/icons/Icons";

import i18n from "@/assets/lang/i18n";
import AppConstants from "@/constants/AppConstants";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as customerService from "@/services/customer";
import CustomerItem from "@/utilities/customers/CustomerItem";
import CustomerItemSkeleton from "@/utilities/customers/CustomerItemSkeleton";
import VerticalList from "@/utilities/lists/VerticalList";
import BaseScreen from "@/utilities/screens/BaseScreen";
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";

const SearchScreen = () => {
  const toast = useToast();
  const { BaseBottomSheet } = useBaseBottomSheet();
  const { getThemeColor } = useBaseTheme();
  const [customers, setCustomers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finish, setFinish] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setFinish(false);
    setLoading(false);
    setRefreshing(false);
    setCustomers([]);
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    if (search === "") {
      setCustomers([]);
      return;
    }
    if (searching) {
      return;
    }
    setSearching(true);
    let Mounted = true;
    currentPage === 1 ? setRefreshing(true) : setLoading(true);
    customerService
      .searchCustomersApi(AppConstants.PER_PAGE, currentPage, search)
      .then((response: any) => {
        setSearching(false);
        if (Mounted) {
          if (
            response?.data.length === 0 ||
            response?.data.length < AppConstants.PER_PAGE
          )
            setFinish(true);

          if (response?.data.length > 0)
            setCustomers((prev) => [...prev, ...response?.data]);

          currentPage === 1 ? setRefreshing(false) : setLoading(false);
        }
      })
      .catch((err: any) => {
        setSearching(false);
        if (Mounted) {
          setFinish(true);
          currentPage === 1 ? setRefreshing(false) : setLoading(false);
          toast.show(err?.response?.data?.message, { type: "danger" });
        }
      });
    return () => {
      Mounted = false;
    };
  }, [search, currentPage]);
  return (
    <>
      <BaseScreen paddingTopOfScreen header>
        <EvtTextInput
          shadow={true}
          autoFocus
          placeholder={i18n.t("customers.searchForCustomer")}
          onChangeText={setSearch}
          value={search}
          prefixIcon={{
            component: SearchIcon,
            color: getThemeColor("textPlaceholder"),
          }}
          placeholderTextColor={getThemeColor("textPlaceholder")}
          maxLength={30}
        />
        <VerticalList
          finish={true}
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
          emptyTextDescription={t(
            "customers.searchForCustomerByEnteringSomeChars"
          )}
        />
      </BaseScreen>
      {BaseBottomSheet}
    </>
  );
};

export default SearchScreen;

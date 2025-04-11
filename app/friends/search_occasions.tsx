import i18n from "@/assets/lang/i18n";
import EvtTextInput from "@/components/EvtComponents/EvtTextInput";
import { OccasionsIcon, SearchIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as customerService from "@/services/customer";
import VerticalList from "@/utilities/lists/VerticalList";
import OccasionItem from "@/utilities/occasions/OccasionItem";
import OccasionItemSkeleton from "@/utilities/occasions/OccasionItemSkeleton";
import BaseScreen from "@/utilities/screens/BaseScreen";
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";

const SearchFollowingOccasionsScreen = () => {
  const { BaseBottomSheet } = useBaseBottomSheet();

  const toast = useToast();
  const { getThemeColor } = useBaseTheme();
  const [occasions, setOccasions] = useState([]);
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
    setOccasions([]);
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    if (search === "") {
      setOccasions([]);
      return;
    }
    if (searching) {
      return;
    }
    setSearching(true);
    let Mounted = true;
    currentPage === 1 ? setRefreshing(true) : setLoading(true);
    customerService
      .followingsOccasionsApi(AppConstants.PER_PAGE, currentPage, search)
      .then((response: any) => {
        setSearching(false);
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
          placeholder={i18n.t("friends.searchForFollowingsOccasions")}
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
          emptyTextDescription={t(
            "friends.searchForFollowingsOccasionsByEnteringSomeChars"
          )}
        />
      </BaseScreen>
      {BaseBottomSheet}
    </>
  );
};

export default SearchFollowingOccasionsScreen;

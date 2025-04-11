import i18n from "@/assets/lang/i18n";
import EvtTextInput from "@/components/EvtComponents/EvtTextInput";
import { CustomersIcon, SearchIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as friendService from "@/services/friend";
import FollowerItem from "@/utilities/followers/FollowerItem";
import FollowerItemSkeleton from "@/utilities/followers/FollowerItemSkeleton";
import FollowingItem from "@/utilities/followings/FollowingItem";
import FollowingItemSkeleton from "@/utilities/followings/FollowingItemSkeleton";
import VerticalList from "@/utilities/lists/VerticalList";
import BaseScreen from "@/utilities/screens/BaseScreen";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";

const SearchFriendsScreen = () => {
  const { useMode, customer_id } = useLocalSearchParams();
  const { BaseBottomSheet } = useBaseBottomSheet();

  const toast = useToast();
  const { getThemeColor } = useBaseTheme();
  const [friends, setFriends] = useState([]);
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
    setFriends([]);
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    if (search === "") {
      setFriends([]);
      return;
    }
    if (searching) {
      return;
    }
    setSearching(true);
    let Mounted = true;
    currentPage === 1 ? setRefreshing(true) : setLoading(true);
    let url =
      useMode == "followers"
        ? friendService.paginateFollowersApi(
            customer_id,
            AppConstants.PER_PAGE,
            currentPage,
            search
          )
        : friendService.paginateFollowingsApi(
            customer_id,
            AppConstants.PER_PAGE,
            currentPage,
            search
          );
    url
      .then((response: any) => {
        setSearching(false);
        if (Mounted) {
          if (
            response?.data.length === 0 ||
            response?.data.length < AppConstants.PER_PAGE
          )
            setFinish(true);

          if (response?.data.length > 0)
            setFriends((prev) => [...prev, ...response?.data]);

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
          placeholder={
            useMode == "followers"
              ? i18n.t("friends.searchForFollowers")
              : i18n.t("friends.searchForFollowings")
          }
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
          numColumns={2}
          datasource={friends}
          refreshing={refreshing}
          loading={loading}
          onEndReached={() => {
            if (!finish && !loading && !refreshing)
              setCurrentPage((prev) => prev + 1);
          }}
          renderItem={({ item }) =>
            useMode == "followers" ? (
              <FollowerItem item={item} shadow={true} />
            ) : (
              <FollowingItem item={item} shadow={true} />
            )
          }
          renderSkeleton={() =>
            useMode == "followers" ? (
              <FollowerItemSkeleton shadow={true} />
            ) : (
              <FollowingItemSkeleton shadow={true} />
            )
          }
          onRefresh={() => {
            if (currentPage > 1) {
              setFriends([]);
              setRefreshing(true);
              setCurrentPage(1);
              setFinish(false);
            }
          }}
          emptyIcon={CustomersIcon}
          emptyTextDescription={
            useMode == "followers"
              ? i18n.t("friends.searchForFollowersByEnteringSomeChars")
              : i18n.t("friends.searchForFollowingsByEnteringSomeChars")
          }
        />
      </BaseScreen>
      {BaseBottomSheet}
    </>
  );
};

export default SearchFriendsScreen;

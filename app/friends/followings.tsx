import i18n from "@/assets/lang/i18n";
import { CustomersIcon, SearchIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as friendService from "@/services/friend";
import { getThemeColorType } from "@/types/general";
import FollowingItem from "@/utilities/followings/FollowingItem";
import FollowingItemSkeleton from "@/utilities/followings/FollowingItemSkeleton";
import VerticalList from "@/utilities/lists/VerticalList";
import BaseScreen from "@/utilities/screens/BaseScreen";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useToast } from "react-native-toast-notifications";

const FollowingsScreen = () => {
  const { getThemeColor } = useBaseTheme();
  const { customer_id } = useLocalSearchParams();

  const toast = useToast();
  const { BaseBottomSheet } = useBaseBottomSheet();

  const [followings, setFollowings] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finish, setFinish] = useState(false);

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  useEffect(() => {
    let Mounted = true;
    if (currentPage === 1) {
      setFollowings([]);
    }
    currentPage === 1 ? setRefreshing(true) : setLoading(true);

    friendService
      .paginateFollowingsApi(
        customer_id,
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
            setFollowings((prev) => [...prev, ...response?.data]);
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

  return (
    <>
      <BaseScreen
        scrollY={scrollY}
        paddingTopOfScreen
        header
        headerText={i18n.t("headers.followings")}
        actionIcon={SearchIcon}
        handlePressAction={() => {
          router.push({
            pathname: "/friends/search",
            params: { useMode: "followings", customer_id: customer_id },
          });
        }}
      >
        <VerticalList
          onScroll={scrollHandler}
          caption={i18n.t("headers.followings")}
          captionSize="large"
          finish={finish}
          numColumns={2}
          datasource={followings}
          refreshing={refreshing}
          loading={loading}
          contentContainerStyle={styles(getThemeColor).followingsContainer}
          onEndReached={() => {
            if (!finish && !loading && !refreshing)
              setCurrentPage((prev) => prev + 1);
          }}
          // onRefresh={() => {
          //   setFollowings([]);
          //   setRefreshing(true);
          //   setCurrentPage(1);
          //   setFinish(false);
          // }}
          renderItem={({ item }) => <FollowingItem item={item} shadow={true} />}
          renderSkeleton={() => <FollowingItemSkeleton shadow={true} />}
          skeletonArrayLength={20}
          emptyIcon={CustomersIcon}
          emptyText={i18n.t("app.notFound")}
          emptyTextDescription={i18n.t("friends.notFoundFollowings")}
        />
      </BaseScreen>
      {BaseBottomSheet}
    </>
  );
};

export default FollowingsScreen;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    scrollView: {
      backgroundColor: getThemeColor("onBackground"),
      flex: 1,
      borderTopLeftRadius: Sizes.border.radius.lg,
      borderTopRightRadius: Sizes.border.radius.lg,
    },
    followingsContainer: {
      backgroundColor: getThemeColor("background"),
      // paddingVertical: AppConstants.MEASURING_UNIT,
    },
  });

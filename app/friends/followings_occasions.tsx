import i18n from "@/assets/lang/i18n";
import { CustomersIcon, SearchIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as customerService from "@/services/customer";
import { getThemeColorType } from "@/types/general";
import VerticalList from "@/utilities/lists/VerticalList";
import OccasionItem from "@/utilities/occasions/OccasionItem";
import OccasionItemSkeleton from "@/utilities/occasions/OccasionItemSkeleton";
import BaseScreen from "@/utilities/screens/BaseScreen";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useToast } from "react-native-toast-notifications";

const FollowingsOccasionsScreen = () => {
  const { getThemeColor } = useBaseTheme();

  const toast = useToast();
  const { BaseBottomSheet } = useBaseBottomSheet();

  const [occasions, setOccasions] = useState<any>([]);
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
    currentPage === 1 ? setRefreshing(true) : setLoading(true);
    customerService
      .followingsOccasionsApi(AppConstants.PER_PAGE, currentPage)
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
      <BaseScreen
        scrollY={scrollY}
        paddingTopOfScreen
        header
        headerText={i18n.t("friends.followingsOccasions")}
        actionIcon={SearchIcon}
        handlePressAction={() => {
          router.push({
            pathname: "/friends/search_occasions",
          });
        }}
      >
        <VerticalList
          onScroll={scrollHandler}
          caption={i18n.t("friends.followingsOccasions")}
          captionSize="large"
          finish={finish}
          numColumns={1}
          datasource={occasions}
          refreshing={refreshing}
          loading={loading}
          contentContainerStyle={styles(getThemeColor).followingsContainer}
          onEndReached={() => {
            if (!finish && !loading && !refreshing)
              setCurrentPage((prev) => prev + 1);
          }}
          // onRefresh={() => {
          //   setOccasions([]);
          //   setRefreshing(true);
          //   setCurrentPage(1);
          //   setFinish(false);
          // }}
          renderItem={({ item }) => <OccasionItem item={item} shadow={true} />}
          renderSkeleton={() => <OccasionItemSkeleton shadow={true} />}
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

export default FollowingsOccasionsScreen;

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

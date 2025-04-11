import i18n from "@/assets/lang/i18n";
import { ArrowRightIcon, OccasionsIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as customerService from "@/services/customer";
import { getThemeColorType } from "@/types/general";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useToast } from "react-native-toast-notifications";
import HorizontalList from "../lists/HorizontalList";
import FollowingOccasionItem from "../occasions/FollowingOccasionItem";
import FollowingOccasionItemSkeleton from "../occasions/FollowingOccasionItemSkeleton";

const FollowingsOccasionsList = ({
  reload,
  setReload,
}: {
  reload?: boolean;
  setReload?: (status: boolean) => void;
}) => {
  const toast = useToast();
  const { getThemeColor } = useBaseTheme();

  const [currentPage, setCurrentPage] = useState(1);
  const [occasions, setOccasions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finish, setFinish] = useState(false);
  useEffect(() => {
    if (reload) {
      setOccasions([]);
      setRefreshing(true);
      setCurrentPage(1);
      setFinish(false);
    }
  }, [reload]);

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
    <HorizontalList
      pagingEnabled={false}
      gap={AppConstants.MEASURING_UNIT}
      captionSize="small"
      captionContainerStyle={{ marginHorizontal: Sizes.margin.md }}
      caption={i18n.t("friends.followingsOccasions")}
      captionIcon={occasions.length > 0 ? ArrowRightIcon : undefined}
      captionIconVariant="Linear"
      captionIconSize={Sizes.iconSize.xl}
      captionIconColor={getThemeColor("tint")}
      onPressCaptionIcon={() =>
        router.push({
          pathname: "/friends/followings_occasions",
        })
      }
      finish={finish}
      datasource={occasions}
      refreshing={refreshing}
      loading={loading}
      contentContainerStyle={styles(getThemeColor).occasionsContainer}
      onEndReached={() => {
        if (!finish && !loading && !refreshing)
          setCurrentPage((prev) => prev + 1);
      }}
      renderItem={({ item }) => (
        <FollowingOccasionItem item={item} shadow={true} />
      )}
      renderSkeleton={() => <FollowingOccasionItemSkeleton shadow={true} />}
      emptyIcon={OccasionsIcon}
      emptyText={i18n.t("app.notFound")}
      emptyTextDescription={i18n.t("occasions.notFoundOccasions")}
      itemHeight={AppConstants.FOLLOWINGS_OCCASION_ITEM_HEIGHT}
      itemWidth={AppConstants.FOLLOWINGS_OCCASION_ITEM_WIDTH}
    />
  );
};
export default FollowingsOccasionsList;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    occasionsContainer: {
      backgroundColor: getThemeColor("background"),
      paddingHorizontal: AppConstants.MEASURING_UNIT,
    },
  });

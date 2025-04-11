import CountsAnimation from "@/animations/CountsAnimation";
import i18n from "@/assets/lang/i18n";
import EvtView from "@/components/EvtComponents/EvtView";
import { CustomersIcon, OccasionsIcon } from "@/components/icons/Icons";
import BackButton from "@/components/shared/BackButton";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as customerService from "@/services/customer";
import * as friendService from "@/services/friend";
import { useCustomersStore } from "@/stores/CustomerStore";
import { useFollowersStore } from "@/stores/FollowerStore";
import { useFollowingsStore } from "@/stores/FollowingStore";
import { useOtherOccasionsStore } from "@/stores/OtherOccasionsStore";
import { useProfileStore } from "@/stores/ProfileStore";
import { getThemeColorType } from "@/types/general";
import CustomerFixedHeader from "@/utilities/customers/CustomerFixedHeader";
import OtherOccasionItem from "@/utilities/customers/OtherOccasionItem";
import OtherOccasionItemSkeleton from "@/utilities/customers/OtherOccasionItemSkeleton";
import CustomersFunctions from "@/utilities/CustomersFunctions";
import VerticalListGesture from "@/utilities/lists/VerticalListGesture";
import CollapsedBottomSheet from "@/utilities/sheets/CollapsedBottomSheet";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useToast } from "react-native-toast-notifications";

const CustomerDetailsScreen = () => {
  const { getThemeColor } = useBaseTheme();
  const toast = useToast();
  const { BaseBottomSheet } = useBaseBottomSheet();
  const storeOccasions = useOtherOccasionsStore(
    (state) => state.storeOccasions
  );
  const clearOccasions = useOtherOccasionsStore(
    (state) => state.clearOccasions
  );
  const storedOccasions = useOtherOccasionsStore(
    (state) => state.storedOccasions
  );

  const profile = useProfileStore((state) => state.profile);
  const pushFollowingId = useProfileStore((state) => state.pushFollowingId);
  const popFollowingId = useProfileStore((state) => state.popFollowingId);

  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finish, setFinish] = useState(false);
  const [action1Loading, setAction1Loading] = useState(false);
  const [action2Loading, setAction2Loading] = useState(false);

  const pushAcceptedFollowerId = useProfileStore(
    (state) => state.pushAcceptedFollowerId
  );
  const popAcceptedFollowerId = useProfileStore(
    (state) => state.popAcceptedFollowerId
  );

  const selectedFollowing = useFollowingsStore(
    (state) => state.selectedFollowing
  );

  const selectedFollower = useFollowersStore((state) => state.selectedFollower);
  const selectedCustomer = useCustomersStore((state) => state.selectedCustomer);

  const customer = selectedFollowing
    ? selectedFollowing
    : selectedFollower
    ? selectedFollower
    : selectedCustomer;

  const bottomSheetRef = useRef(null);
  const closeBottomSheet = () => {
    bottomSheetRef?.current.close();
  };
  const scrollY = useSharedValue<number>(AppConstants.SCROLL_THRESHOLD);
  useEffect(() => {
    setCurrentPage(1);
  }, [customer]);
  useEffect(() => {
    let Mounted = true;
    if (currentPage === 1) {
      clearOccasions();
    }
    currentPage === 1 ? setRefreshing(true) : setLoading(true);
    // if (profile?.accepted_followings_ids?.includes(customer?.id)) {
    customerService
      .otherOccasionsApi(customer?.id, AppConstants.PER_PAGE, currentPage)
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
          currentPage === 1 ? setRefreshing(false) : setLoading(false);
          setFinish(true);
          bottomSheetRef?.current.collapse();
          toast.show(err?.response?.data?.message, { type: "danger" });
        }
      });
    // } else {
    //   setRefreshing(false);
    //   setLoading(false);
    //   setFinish(true);
    //   bottomSheetRef?.current.collapse();
    // }

    return () => {
      Mounted = false;
    };
  }, [currentPage]);

  const handleProcessFollower = () => {
    setAction1Loading(true);
    friendService
      .processFollowerApi(customer?.id)
      .then((response: any) => {
        setAction1Loading(false);
        if (response?.data.accepted) pushAcceptedFollowerId(customer?.id);
        else popAcceptedFollowerId(customer?.id);
        toast.show(response?.data?.message, { type: "success" });
      })
      .catch((err: any) => {
        setAction1Loading(false);
        toast.show(err?.response?.data?.message, { type: "danger" });
      });
  };

  const follow = () => {
    let customer_id = customer?.id;
    setAction2Loading(true);
    friendService
      .followApi(customer_id)
      .then((response: any) => {
        if (response?.data?.follow) {
          pushFollowingId(customer_id);
        } else {
          popFollowingId(customer_id);
        }
        setAction2Loading(false);
        toast.show(response?.data?.message, { type: "success" });
      })
      .catch((err: any) => {
        setAction2Loading(false);
        toast.show(err?.response?.data?.message, { type: "danger" });
      });
  };

  return (
    <SafeAreaView style={styles(getThemeColor).container}>
      <>
        {customer?.image && (
          <ImageBackground
            resizeMode="cover"
            style={styles(getThemeColor).image}
            source={{ uri: customer?.image }}
          >
            <BackButton
              color={getThemeColor("onBackground")}
              style={{ marginTop: AppConstants.TOP_OF_SCREEN }}
            />
          </ImageBackground>
        )}
        {!customer?.image && (
          <LinearGradient
            colors={[
              getThemeColor("placeholder"),
              getThemeColor("background"),
              getThemeColor("placeholder"),
              getThemeColor("background"),
              getThemeColor("placeholder"),
              getThemeColor("background"),
            ]}
            start={[0, 1]}
            end={[1, 0]}
            style={styles(getThemeColor).image}
          >
            <BackButton
              color={getThemeColor("onBackground")}
              style={{ marginTop: AppConstants.TOP_OF_SCREEN }}
            />
          </LinearGradient>
        )}
        <EvtView style={styles(getThemeColor).countsContainer}>
          <CountsAnimation
            scrollY={scrollY}
            icon={CustomersIcon}
            iconColor={getThemeColor("text")}
            iconSize={Sizes.icon.size.xs}
            title={i18n.t("friends.followings")}
            value={customer?.followings_count}
            index={2}
            handlePress={() => {
              if (customer?.followings_count > 0)
                router.replace({
                  pathname: "/friends/followings",
                  params: { customer_id: customer?.id },
                });
            }}
          />
          <CountsAnimation
            scrollY={scrollY}
            icon={CustomersIcon}
            iconColor={getThemeColor("text")}
            iconSize={Sizes.icon.size.xs}
            title={i18n.t("friends.followers")}
            value={customer?.followers_count}
            index={2}
            handlePress={() => {
              if (customer?.followers_count > 0)
                router.replace({
                  pathname: "/friends/followers",
                  params: { customer_id: customer?.id },
                });
            }}
          />
        </EvtView>
        <View style={styles(getThemeColor).overlay} />
      </>
      <CollapsedBottomSheet
        backgroundColor={getThemeColor("background")}
        fixedHeader={
          <CustomerFixedHeader
            customer={customer}
            actionColor={getThemeColor("tint")}
            action1={CustomersFunctions.isFollower(customer?.id)}
            action1Loading={action1Loading}
            actionIcon1={CustomersFunctions.FollowerIcon(customer?.id)}
            actionIcon1Variant="Bulk"
            handlePressAction1={handleProcessFollower}
            action2={true}
            action2Loading={action2Loading}
            actionIcon2={CustomersFunctions.FollowingIcon(customer?.id)}
            handlePressAction2={follow}
          />
        }
        ref={bottomSheetRef}
      >
        <VerticalListGesture
          gap={AppConstants.SHADOW_WIDTH}
          finish={finish}
          numColumns={2}
          datasource={storedOccasions}
          refreshing={refreshing}
          loading={loading}
          contentContainerStyle={styles(getThemeColor).occasionsContainer}
          onEndReached={() => {
            if (!finish && !loading && !refreshing)
              setCurrentPage((prev) => prev + 1);
          }}
          renderItem={({ item }) => (
            <OtherOccasionItem item={item} shadow={true} />
          )}
          renderSkeleton={() => <OtherOccasionItemSkeleton shadow={true} />}
          emptyIcon={OccasionsIcon}
          emptyText={i18n.t("app.notFound")}
          emptyTextDescription={i18n.t("occasions.notFoundOccasions")}
        />
      </CollapsedBottomSheet>
      {BaseBottomSheet}
    </SafeAreaView>
  );
};

export default CustomerDetailsScreen;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingTop: AppConstants.TOP_OF_SCREEN * 0,
    },
    image: {
      flex: 1,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: getThemeColor("overlay"),
    },
    occasionsContainer: {
      backgroundColor: getThemeColor("background"),
      paddingVertical: AppConstants.MEASURING_UNIT,
      paddingBottom: AppConstants.WINDOW_HEIGHT / 7,
    },
    countsContainer: {
      flexDirection: "row",
      position: "absolute",
      backgroundColor: "transparent",
      top: AppConstants.WINDOW_HEIGHT / 10 + Sizes.margin.md,
      // right: Sizes.margin.md,
      right: 0,
      overflow: "visible",
      zIndex: AppConstants.LAYER_TOP,
    },
  });

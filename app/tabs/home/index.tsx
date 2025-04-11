import EvtFontStyles from "@/assets/styles/EvtFontStyles";
import EvtText from "@/components/EvtComponents/EvtText";
import EvtView from "@/components/EvtComponents/EvtView";
import AppConstants from "@/constants/AppConstants";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { getThemeColorType } from "@/types/general";
import GlobalFunctions from "@/utilities/GlobalFunctions";
import FollowingsOccasionsList from "@/utilities/home/FollowingsOccasionsList";
import HomeCarouselAdvertisement from "@/utilities/home/HomeCarouselAdvertisement";
import HomeHeaderNoImage from "@/utilities/home/HomeHeaderNoImage";
import HomeHeaderWithImage from "@/utilities/home/HomeHeaderWithImage";
import { useRef, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const HomeScreen = () => {
  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);
  const { getThemeColor } = useBaseTheme();
  const { BaseBottomSheet } = useBaseBottomSheet();
  const svRef = useRef(null);
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });
  // const [refreshing, setRefreshing] = useState(false);
  const [reload, setReload] = useState(false);
  return (
    <SafeAreaView style={styles(getThemeColor).container}>
      <HomeHeaderNoImage scrollY={scrollY} />
      <EvtView style={styles(getThemeColor).main}>
        <Animated.ScrollView
          ref={svRef}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          style={styles(getThemeColor).scrollView}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={refreshing}
          //     onRefresh={() => setReload(true)}
          //     colors={[getThemeColor("tint")]}
          //   />
          // }
        >
          <HomeHeaderWithImage scrollY={scrollY} />
          <EvtText>Token: {expoPushToken?.data ?? ""}</EvtText>
          <EvtText>Notification: {data}</EvtText>
          <HomeCarouselAdvertisement />
          <FollowingsOccasionsList reload={reload} setReload={setReload} />
          {GlobalFunctions.getDummyArray(1000).map((e) => (
            <EvtText
              key={e.id}
              style={[
                { ...EvtFontStyles.BodyBold },
                {
                  margin: AppConstants.MEASURING_UNIT,
                },
              ]}
            >
              {e.id}
            </EvtText>
          ))}
        </Animated.ScrollView>
      </EvtView>
      {BaseBottomSheet}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingTop: AppConstants.TOP_OF_SCREEN * 0,
    },
    main: {
      flex: 1,
      backgroundColor: getThemeColor("background"),
    },
    scrollView: {
      backgroundColor: getThemeColor("background"),
    },
  });

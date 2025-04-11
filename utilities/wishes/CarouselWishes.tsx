import CarouselButtonAnimation from "@/animations/CarouselButtonAnimation";
import i18n from "@/assets/lang/i18n";
import EvtView from "@/components/EvtComponents/EvtView";
import {
  AddSquareIcon,
  ArrowSquareRightIcon,
  WishesIcon,
} from "@/components/icons/Icons";
import Carousel from "@/components/shared/Carousel";
import AppConstants from "@/constants/AppConstants";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import * as occasionService from "@/services/occasion";
import { useMyOccasionsStore } from "@/stores/MyOccasionsStore";
import { useMyWishesStore } from "@/stores/MyWishesStore";
import { useOtherOccasionsStore } from "@/stores/OtherOccasionsStore";
import { useProfileStore } from "@/stores/ProfileStore";
import { WishType } from "@/types/wish";
import { useEffect, useState } from "react";
import { StyleSheet, ViewToken } from "react-native";
import { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { useAnimatedRef, useSharedValue } from "react-native-reanimated";
import { useToast } from "react-native-toast-notifications";
import CarouselWishItem from "./CarouselWishItem";
import WishFormModal from "./WishFormModal";

const CarouselWishes = () => {
  const [finish, setFinish] = useState(false);
  const flatListRef = useAnimatedRef<any>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const { openBaseBottomSheet } = useBaseBottomSheet();

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    unSelectWish();
    if (viewableItems[0].index !== null) {
      selectWish(storedWishes[viewableItems[0].index]);
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const gestureHandler = (e: PanGestureHandlerGestureEvent) => {
    x.value = e.nativeEvent.contentOffset?.x;
  };
  const toast = useToast();

  const myOccasion = useMyOccasionsStore((state) => state.selectedOccasion);
  const otherOccasion = useOtherOccasionsStore(
    (state) => state.selectedOccasion
  );
  const selectedOccasion = myOccasion?.id ? myOccasion : otherOccasion;
  const selectWish = useMyWishesStore((state) => state.selectWish);
  const unSelectWish = useMyWishesStore((state) => state.unSelectWish);
  const storeWishes = useMyWishesStore((state) => state.storeWishes);
  const storedWishes = useMyWishesStore((state) => state.storedWishes);
  const clearWishes = useMyWishesStore((state) => state.clearWishes);
  const profile = useProfileStore((state) => state.profile);

  useEffect(() => {
    const getWishes = async () => {
      try {
        setFinish(false);
        clearWishes();
        unSelectWish();
        if (selectedOccasion) {
          let occasion_id = selectedOccasion?.id;
          const response: any = await occasionService.getWishesApi(
            occasion_id,
            AppConstants.PER_PAGE,
            1
          );
          storeWishes(response?.data);

          if (response?.data?.length > 0) {
            selectWish(response?.data[0]);
          }
          setFinish(true);
        } else {
          setFinish(true);
          clearWishes();
        }
      } catch (error: any) {
        setFinish(true);
        toast.show(error?.response?.data?.message, { type: "danger" });
      }
    };
    getWishes();
  }, [selectedOccasion]);

  const handleNextWish = () => {
    if (flatListIndex.value < storedWishes.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: flatListIndex.value + 1,
      });
    } else {
      flatListRef.current?.scrollToIndex({
        index: 0,
      });
    }
  };

  const handleAddWish = () => {
    unSelectWish();
    openBaseBottomSheet(<WishFormModal />);
  };
  const renderWish = ({ item, index }: { item: WishType; index: number }) => {
    return <CarouselWishItem item={item} />;
  };

  return (
    <>
      <Carousel
        finish={finish}
        flatListRef={flatListRef}
        onScroll={gestureHandler}
        dataSource={storedWishes}
        renderItem={renderWish}
        keyExtractor={(item) => item.id.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
        pagination={true}
        x={x}
        emptyIcon={WishesIcon}
        emptyText={i18n.t("app.notFound")}
        emptyTextDescription={i18n.t("wishes.notFoundWishes")}
      />
      <EvtView style={styles.bottomContainer}>
        {storedWishes.length > 0 && (
          <CarouselButtonAnimation
            title={i18n.t("wishes.firstWish")}
            icon={ArrowSquareRightIcon}
            flatListRef={flatListRef}
            flatListIndex={flatListIndex}
            dataLength={storedWishes.length}
            x={x}
            handlePress={handleNextWish}
          />
        )}
        {selectedOccasion?.customer_id == profile?.id && (
          <CarouselButtonAnimation
            title={i18n.t("wishes.addWish")}
            icon={AddSquareIcon}
            flatListRef={flatListRef}
            flatListIndex={flatListIndex}
            dataLength={storedWishes.length}
            x={x}
            handlePress={handleAddWish}
          />
        )}
      </EvtView>
    </>
  );
};

export default CarouselWishes;

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: AppConstants.MEASURING_UNIT * 3,
  },
});

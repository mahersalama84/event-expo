import Carousel from "@/components/shared/Carousel";
import { useAdvertisementStore } from "@/stores/AdvertisementsStore";
import { ViewToken } from "react-native";
import { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { useAnimatedRef, useSharedValue } from "react-native-reanimated";
import CarouselAdvertisementItem from "./CarouselAdvertisementItem";
import CarouselAdvertisementItemSkeleton from "./CarouselAdvertisementItemSkeleton";

const HomeCarouselAdvertisement = () => {
  const advertisements = useAdvertisementStore((state) => state.advertisements);
  const flatListRef = useAnimatedRef<any>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const gestureHandler = (e: PanGestureHandlerGestureEvent) => {
    x.value = e.nativeEvent.contentOffset?.x;
  };
  const renderAdvertisement = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => {
    return <CarouselAdvertisementItem item={item} />;
  };
  return advertisements?.length > 0 ? (
    <Carousel
      finish={true}
      flatListRef={flatListRef}
      onScroll={gestureHandler}
      dataSource={advertisements}
      renderItem={renderAdvertisement}
      keyExtractor={(item) => item}
      onViewableItemsChanged={onViewableItemsChanged}
      pagination={true}
      x={x}
    />
  ) : (
    <CarouselAdvertisementItemSkeleton />
  );
};

export default HomeCarouselAdvertisement;

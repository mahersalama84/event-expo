import AppConstants from "@/constants/AppConstants";
import { CarouselType } from "@/types/general";
import { FlatList } from "react-native-gesture-handler";
import EvtEmptyList from "../EvtComponents/EvtEmptyList";
import EvtView from "../EvtComponents/EvtView";
import LargeLoading from "./LargeLoading";
import Pagination from "./Pagination";
import Spacer from "./Spacer";

const Carousel = ({
  finish,
  flatListRef,
  onScroll,
  dataSource,
  renderItem,
  keyExtractor,
  onViewableItemsChanged,
  pagination,
  x,
  emptyText,
  emptyTextDescription,
  emptyIcon,
}: CarouselType) => {
  const showData = finish && dataSource.length > 0;
  const showLoading = !finish;
  const showPagination = finish && pagination && dataSource.length > 0;
  const showEmpty = finish && dataSource.length === 0 && emptyIcon;
  return (
    <EvtView>
      {showData && (
        <FlatList
          ref={flatListRef}
          onScroll={onScroll}
          onEndReached={(e) => {}}
          data={dataSource}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          scrollEventThrottle={16}
          horizontal={true}
          bounces={false}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            minimumViewTime: 10,
            viewAreaCoveragePercentThreshold: 10,
          }}
        />
      )}
      {showLoading && <LargeLoading />}
      {showPagination && <Pagination data={dataSource} x={x} />}
      {showEmpty && (
        <>
          <Spacer height={AppConstants.MEASURING_UNIT * 4} />
          <EvtEmptyList
            text={emptyText}
            description={emptyTextDescription}
            icon={emptyIcon}
          />
        </>
      )}
    </EvtView>
  );
};

export default Carousel;

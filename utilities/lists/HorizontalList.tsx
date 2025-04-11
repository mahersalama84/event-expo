import EvtEmptyList from "@/components/EvtComponents/EvtEmptyList";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtView from "@/components/EvtComponents/EvtView";
import BounceLoading from "@/components/shared/BounceLoading";
import Spacer from "@/components/shared/Spacer";
import AppConstants from "@/constants/AppConstants";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { HorizontalListType } from "@/types/general";
import React from "react";
import { RefreshControl, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import ListHeader from "./ListHeader";

export default function HorizontalList<T>(props: HorizontalListType<T>) {
  const { getThemeColor } = useBaseTheme();
  const showEmptyText =
    // props.finish &&
    !props.hideEmptyText &&
    props.datasource.length === 0 &&
    !props.refreshing &&
    !props.loading;
  const skeletonArrayLength = props.skeletonArrayLength || 10;
  let skeletonArray = [];
  for (let i = 0; i < skeletonArrayLength; i++) {
    skeletonArray.push(i);
  }

  const visionRange = props.itemWidth
    ? Math.ceil(AppConstants.WINDOW_WIDTH / props.itemWidth) + 1
    : undefined;

  return (
    <EvtView style={[!showEmptyText ? { flex: 1 } : null]}>
      <ListHeader
        captionSize={props.captionSize}
        captionContainerStyle={props.captionContainerStyle}
        captionStyle={props.captionStyle}
        caption={props.caption}
        captionIcon={props.captionIcon}
        captionIconVariant={props.captionIconVariant}
        captionIconSize={props.captionIconSize}
        captionIconColor={props.captionIconColor}
        onPressCaptionIcon={props.onPressCaptionIcon}
      />
      <FlatList
        horizontal
        pagingEnabled={props.pagingEnabled}
        maxToRenderPerBatch={visionRange}
        initialNumToRender={visionRange}
        scrollEnabled={true}
        onScroll={props.onScroll}
        data={props.refreshing ? skeletonArray : props.datasource}
        showsHorizontalScrollIndicator={false}
        onEndReachedThreshold={1}
        scrollEventThrottle={16}
        hideEmptyText={true}
        onEndReached={props.refreshing ? null : props.onEndReached}
        ItemSeparatorComponent={() => (
          <Spacer
            width={props.gap != null ? props.gap : AppConstants.MEASURING_UNIT}
          />
        )}
        refreshControl={
          props.onRefresh ? (
            <RefreshControl
              refreshing={props.refreshing === true}
              onRefresh={props.onRefresh}
              colors={[getThemeColor("tint")]}
            />
          ) : undefined
        }
        contentContainerStyle={[props.contentContainerStyle]}
        renderItem={props.refreshing ? props.renderSkeleton : props.renderItem}
        keyExtractor={
          props.keyExtractor
            ? props.keyExtractor
            : (item, i) => {
                if (typeof item === "object")
                  return (item as Object).hasOwnProperty("id")
                    ? (item as any).id
                    : i;
                return item || i;
              }
        }
        ListFooterComponent={
          <EvtView
            style={{
              flex: 1,
              paddingHorizontal: AppConstants.MEASURING_UNIT * 2,
              justifyContent: "center",
            }}
          >
            {props.loading && !props.finish && (
              <BounceLoading
                direction="X"
                circleSize={30}
                circleBorderWidth={2}
                dotSize={10}
              />
            )}
            <Spacer height={AppConstants.MEASURING_UNIT * 2} />
          </EvtView>
        }
      />

      {props.finish && showEmptyText && (
        <EvtEmptyList
          text={props.emptyText}
          description={props.emptyTextDescription}
          icon={props.emptyIcon}
        />
      )}
    </EvtView>
  );
}

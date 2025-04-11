import EvtEmptyList from "@/components/EvtComponents/EvtEmptyList";
import EvtView from "@/components/EvtComponents/EvtView";
import BounceLoading from "@/components/shared/BounceLoading";
import Spacer from "@/components/shared/Spacer";
import AppConstants from "@/constants/AppConstants";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { VerticalListType } from "@/types/general";
import React from "react";
import { RefreshControl } from "react-native";
import Animated from "react-native-reanimated";
import ListHeader from "./ListHeader";

export default function VerticalList<T>(props: VerticalListType<T>) {
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

  return (
    <EvtView style={[!showEmptyText ? { flex: 1 } : null]}>
      {props.beforeList && props.beforeList}
      <Animated.FlatList
        // pagingEnabled={true}
        scrollEnabled={true}
        onScroll={props.onScroll}
        numColumns={props.numColumns}
        data={props.refreshing ? skeletonArray : props.datasource}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={1}
        scrollEventThrottle={16}
        hideEmptyText={true}
        onEndReached={props.refreshing ? null : props.onEndReached}
        ItemSeparatorComponent={() => (
          <Spacer
            height={props.gap != null ? props.gap : AppConstants.MEASURING_UNIT}
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
        ListHeaderComponent={
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
        }
        ListFooterComponent={
          <EvtView style={{ paddingVertical: AppConstants.MEASURING_UNIT * 2 }}>
            {props.loading && !props.finish && (
              <BounceLoading
                direction="Y"
                circleSize={30}
                circleBorderWidth={2}
                dotSize={10}
              />
            )}
            {props.lastItemRender && props.lastItemRender}
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

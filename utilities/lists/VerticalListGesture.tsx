import EvtEmptyList from "@/components/EvtComponents/EvtEmptyList";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtView from "@/components/EvtComponents/EvtView";
import BounceLoading from "@/components/shared/BounceLoading";
import Spacer from "@/components/shared/Spacer";
import AppConstants from "@/constants/AppConstants";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { VerticalListType } from "@/types/general";
import React from "react";
import { RefreshControl } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

export default function VerticalListGesture<T>(props: VerticalListType<T>) {
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
  let backgroundColor = props.backgroundColor ?? "transparent";
  return (
    <EvtView style={[{ backgroundColor }, !showEmptyText ? { flex: 1 } : null]}>
      {props.caption && (
        <Animated.View
          style={[
            props.captionContainerStyle,
            {
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: AppConstants.MEASURING_UNIT,
              marginVertical: AppConstants.MEASURING_UNIT,
            },
          ]}
        >
          {props.caption && (
            <EvtStyledText.BodyBold style={props.captionStyle}>
              {props.caption}
            </EvtStyledText.BodyBold>
          )}
          {props.captionIcon && <Spacer flex />}
          {props.captionIcon}
        </Animated.View>
      )}
      {/* {props.caption && <Spacer height={AppConstants.MEASURING_UNIT * 1.5} />} */}
      {props.beforeList && props.beforeList}
      <FlatList
        // pagingEnabled={true}
        scrollEnabled={true}
        onScroll={props.onScroll}
        numColumns={props.numColumns}
        data={props.refreshing ? skeletonArray : props.datasource}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        scrollEventThrottle={20}
        hideEmptyText={true}
        onEndReached={props.refreshing ? null : props.onEndReached}
        ItemSeparatorComponent={() => (
          <Spacer
            height={props.gap != null ? props.gap : AppConstants.MEASURING_UNIT}
            backgroundColor={backgroundColor}
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
              backgroundColor,
              paddingVertical: AppConstants.MEASURING_UNIT * 2,
            }}
          >
            {props.loading && !props.finish && (
              <BounceLoading
                direction="Y"
                circleSize={30}
                circleBorderWidth={2}
                dotSize={10}
              />
            )}
            {props.lastItemRender && props.lastItemRender}
            <Spacer
              height={AppConstants.MEASURING_UNIT * 2}
              backgroundColor={backgroundColor}
            />
          </EvtView>
        }
      />

      {props.finish && showEmptyText && (
        <EvtEmptyList
          icon={props.emptyIcon}
          backgroundColor={backgroundColor}
          text={props.emptyText}
          description={props.emptyTextDescription}
        />
      )}
    </EvtView>
  );
}

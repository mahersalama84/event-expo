import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { EmptyListType, getThemeColorType } from "@/types/general";
import React from "react";
import { StyleSheet } from "react-native";
import EvtStyledText from "./EvtStyledText";
import EvtView from "./EvtView";

const EvtEmptyList = (props: EmptyListType) => {
  const { getThemeColor } = useBaseTheme();
  let backgroundColor = props.backgroundColor ?? "transparent";
  const Icon = props.icon;
  return (
    <EvtView style={[{ backgroundColor }, styles(getThemeColor).mainContainer]}>
      <EvtView style={styles(getThemeColor).iconContainer}>
        <Icon
          {...props}
          variant="TwoTone"
          size={Sizes.icon.size.lg}
          color={getThemeColor("tint")}
        />
      </EvtView>
      {props.text && (
        <EvtStyledText.SubScreenTitle textAlign="center">
          {props.text}
        </EvtStyledText.SubScreenTitle>
      )}
      {props.description && (
        <EvtStyledText.Body textAlign="center">
          {props.description}
        </EvtStyledText.Body>
      )}
    </EvtView>
  );
};

export default EvtEmptyList;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    mainContainer: {
      // justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: AppConstants.MEASURING_UNIT,
    },
    iconContainer: {
      alignSelf: "center",
      padding: Sizes.padding.md,
      marginBottom: Sizes.margin.md,
      backgroundColor: getThemeColor("onBackground"),
      borderRadius: AppConstants.MEASURING_UNIT * 0.75,
    },
  });

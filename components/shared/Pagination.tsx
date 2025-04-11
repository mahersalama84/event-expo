import DotAnimation from "@/animations/DotAnimation";
import AppConstants from "@/constants/AppConstants";
import { useLanguageStore } from "@/stores/LanguageStore";
import { PaginationType } from "@/types/general";
import React from "react";
import { StyleSheet, View } from "react-native";

const Pagination = ({ data, x }: PaginationType) => {
  const isRTL = useLanguageStore((state) => state.isRTL);
  return (
    <View style={styles(isRTL).paginationContainer}>
      {data.map((_, index) => {
        return <DotAnimation index={index} x={x} key={index} />;
      })}
    </View>
  );
};

export default Pagination;

const styles = (isRTL: boolean) =>
  StyleSheet.create({
    paginationContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      height: AppConstants.MEASURING_UNIT * 2,
      justifyContent: "center",
      alignItems: "center",
    },
  });

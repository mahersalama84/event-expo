import { StyleSheet } from "react-native";
import EvtFontFamily from "./EvtFontFamily";

const EvtFontStyles = StyleSheet.create({
  hugeTitle: {
    lineHeight: 70,
    fontSize: 60,
    ...EvtFontFamily.REGULAR,
  },
  ScreenTitle: {
    lineHeight: 34,
    fontSize: 28,
    ...EvtFontFamily.BOLD,
  },
  SubScreenTitle: {
    lineHeight: 22,
    fontSize: 17,
    ...EvtFontFamily.BOLD,
  },
  LayoutHeader: {
    lineHeight: 28,
    fontSize: 22,
    ...EvtFontFamily.BOLD,
  },
  Body: {
    lineHeight: 22,
    fontSize: 17,
    ...EvtFontFamily.LIGHT,
  },
  BodyBold: {
    lineHeight: 22,
    fontSize: 17,
    ...EvtFontFamily.MEDIUM,
  },

  Caption1: {
    lineHeight: 16,
    fontSize: 12,
    ...EvtFontFamily.REGULAR,
  },

  Caption2: {
    lineHeight: 12,
    fontSize: 11,
    ...EvtFontFamily.REGULAR,
  },

  Caption3: {
    lineHeight: 8,
    fontSize: 7,
    ...EvtFontFamily.REGULAR,
  },

  largeTitle: {
    lineHeight: 41,
    fontSize: 34,
  },

  title3: {
    lineHeight: 24,
    fontSize: 20,
  },
  footnote: {
    lineHeight: 16,
    fontSize: 13,
  },

  headLine: {
    lineHeight: 22,
    fontSize: 17,
  },
  subHeadLine: {
    lineHeight: 20,
    fontSize: 15,
  },
});

export default EvtFontStyles;

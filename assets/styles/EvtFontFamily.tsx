import { TextStyle } from "react-native";

type FontType = {
  BOLD: TextStyle;
  EXTRALIGHT: TextStyle;
  LIGHT: TextStyle;
  MEDIUM: TextStyle;
  REGULAR: TextStyle;
  SEMIBOLD: TextStyle;
};

const EvtFontFamily: FontType = {
  BOLD: { fontFamily: "OswaldBold" },
  EXTRALIGHT: { fontFamily: "OswaldLight" },
  LIGHT: { fontFamily: "OswaldLight" },
  MEDIUM: { fontFamily: "OswaldMedium" },
  REGULAR: { fontFamily: "OswaldRegular" },
  SEMIBOLD: { fontFamily: "OswaldSemiBold" },
};

export default EvtFontFamily;

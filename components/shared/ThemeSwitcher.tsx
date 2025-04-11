import i18n from "@/assets/lang/i18n";
import EvtStyles from "@/assets/styles/EvtStyles";
import GetIcon from "@/components/icons/GetIcon";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { useLanguageStore } from "@/stores/LanguageStore";
import { getThemeColorType } from "@/types/general";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";
import EvtStyledText from "../EvtComponents/EvtStyledText";
import { DarkModeIcon, LightModeIcon } from "../icons/Icons";

const ThemeSwitcher = () => {
  const { theme, getThemeColor, toggleTheme, useSystemTheme } = useBaseTheme();
  const isRTL = useLanguageStore((state) => state.isRTL);

  const [isDark, setIsDark] = useState(theme === "dark" ? true : false);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    toggleTheme(newTheme);
    setIsDark(theme === "light" ? true : false);
  };

  return (
    <Animated.View entering={(isRTL ? SlideInLeft : SlideInRight).delay(300)}>
      <TouchableOpacity
        style={styles(getThemeColor).card}
        key={i18n.t("forms.darkMode")}
        onPress={handleToggleTheme}
      >
        <EvtStyledText.Body>{i18n.t("forms.darkMode")}</EvtStyledText.Body>
        {isDark && (
          <GetIcon
            icon={LightModeIcon}
            size={Sizes.icon.size.md}
            color={getThemeColor("text")}
          />
        )}
        {!isDark && (
          <GetIcon
            icon={DarkModeIcon}
            size={Sizes.icon.size.md}
            color={getThemeColor("text")}
          />
        )}
        {/* <EvtSwitch
        value={isDark}
        onValueChange={(value) => {
          if (value == true) toggleTheme("dark");
          else toggleTheme("light");
          setIsDark(value);
        }}
      /> */}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ThemeSwitcher;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    card: {
      ...EvtStyles.components.card,
      backgroundColor: getThemeColor("onBackground"),
      padding: AppConstants.MEASURING_UNIT,
      marginVertical: AppConstants.MEASURING_UNIT / 2,
      borderRadius: Sizes.border.radius.md,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });

import i18n from "@/assets/lang/i18n";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtTouchable from "@/components/EvtComponents/EvtTouchable";
import GetIcon from "@/components/icons/GetIcon";
import { SearchIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { getThemeColorType } from "@/types/general";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

const HomeSearchBar = () => {
  const { getThemeColor } = useBaseTheme();
  return (
    <EvtTouchable
      style={styles(getThemeColor).searchBarContainer}
      activeColor={getThemeColor("backdrop")}
      handleSingleTap={() => router.push({ pathname: "/tabs/home/search" })}
    >
      <GetIcon
        icon={SearchIcon}
        color={getThemeColor("textPlaceholder")}
        size={Sizes.icon.size.md}
      />
      <EvtStyledText.Body
        color={getThemeColor("textPlaceholder")}
        style={{ marginLeft: AppConstants.MEASURING_UNIT }}
      >
        {i18n.t("customers.searchForCustomer")}
      </EvtStyledText.Body>
    </EvtTouchable>
  );
};

export default HomeSearchBar;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    searchBarContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: AppConstants.MEASURING_UNIT,
      marginTop: AppConstants.MEASURING_UNIT,
      padding: AppConstants.MEASURING_UNIT,
      backgroundColor: getThemeColor("onBackground"),
      borderRadius: Sizes.border.radius.xxl,
    },
  });

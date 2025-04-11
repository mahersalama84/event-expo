import i18n from "@/assets/lang/i18n";
import EvtFontStyles from "@/assets/styles/EvtFontStyles";
import AppConstants from "@/constants/AppConstants";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { useLanguageStore } from "@/stores/LanguageStore";
import { useMyOccasionsStore } from "@/stores/MyOccasionsStore";
import { useOtherOccasionsStore } from "@/stores/OtherOccasionsStore";
import CustomDrawerContent from "@/utilities/Drawer/CustomDrawerContent";
import DrawerHumburger from "@/utilities/Drawer/DrawerHumburger";
import { useSegments } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DrawerLayout = () => {
  const segments = useSegments();
  const { getThemeColor } = useBaseTheme();
  const { closeBaseBottomSheet } = useBaseBottomSheet();

  const myOccasion = useMyOccasionsStore((state) => state.selectedOccasion);
  const otherOccasion = useOtherOccasionsStore(
    (state) => state.selectedOccasion
  );
  const selectedOccasion = myOccasion?.id ? myOccasion : otherOccasion;

  const isRTL = useLanguageStore((state) => state.isRTL);
  useEffect(() => {
    closeBaseBottomSheet();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        defaultStatus="open"
        screenOptions={{
          headerShown: true,
          title:
            segments[0] == "drawer" && segments[1] == "occasion"
              ? selectedOccasion?.title
              : segments[0] == "drawer" && segments[1] == "attendence"
              ? i18n.t("occasions.attendence") +
                " (" +
                selectedOccasion?.attendence_ids.length +
                ")"
              : segments[0] == "drawer" && segments[1] == "wishes"
              ? i18n.t("wishes.wishes") +
                " (" +
                selectedOccasion?.wishes_count +
                ")"
              : "",
          headerTitleStyle: {
            color: getThemeColor("text"),
            ...EvtFontStyles.LayoutHeader,
          },
          headerLeft: (x) => <DrawerHumburger />,

          headerLeftContainerStyle: {},
          headerStyle: {
            backgroundColor: getThemeColor("onBackground"),
          },

          drawerInactiveTintColor: getThemeColor("tint"),
          drawerActiveTintColor: getThemeColor("buttonTitleColor"),
          drawerActiveBackgroundColor: getThemeColor("tint"),
          drawerInactiveBackgroundColor: getThemeColor("onBackground"),
          drawerContentContainerStyle: {},
          drawerContentStyle: {},
          drawerLabelStyle: {
            ...EvtFontStyles.BodyBold,
            marginLeft: -AppConstants.MEASURING_UNIT * 2,
          },
          overlayColor: getThemeColor("backdrop"),
          drawerHideStatusBarOnOpen: false,
          drawerStyle: {},
          drawerType: "back",
          drawerPosition: isRTL ? "right" : "left",
        }}
      ></Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;

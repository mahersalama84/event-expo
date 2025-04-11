import EvtStyles from "@/assets/styles/EvtStyles";
import EvtAvatar from "@/components/EvtComponents/EvtAvatar";
import {
  CustomersIcon,
  HomeIcon,
  OccasionsIcon,
} from "@/components/icons/Icons";
import { Redirect, Tabs, useSegments } from "expo-router";
import React, { useEffect } from "react";

import i18n from "@/assets/lang/i18n";
import EvtFontStyles from "@/assets/styles/EvtFontStyles";
import EvtView from "@/components/EvtComponents/EvtView";
import BottomTabIcon from "@/components/icons/BottomTabIcon";
import BounceLoading from "@/components/shared/BounceLoading";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useSession } from "@/context/BaseAuthContext";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { useProfileStore } from "@/stores/ProfileStore";

const TabsLayout = () => {
  const { isOpen, closeBaseBottomSheet } = useBaseBottomSheet();
  const segments = useSegments();
  const page = segments[segments.length - 1];

  useEffect(() => {
    if (isOpen) {
      closeBaseBottomSheet();
    }
  }, [page]);

  const pagesToHideTabBar = [
    "search",
    "customerDetails",
    "notifications",
    "settings",
    "language",
    "personalInfo",
  ];

  const { getThemeColor } = useBaseTheme();
  const { session, isLoading } = useSession();

  const profile = useProfileStore((state) => state.profile);
  if (isLoading) {
    return (
      <EvtView
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <BounceLoading
          direction="X"
          circleSize={30}
          circleBorderWidth={2}
          dotSize={10}
        />
      </EvtView>
    );
  }
  if (!session) {
    return <Redirect href="../auth/login" />;
  }
  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerStyle: {
          backgroundColor: getThemeColor("onBackground"),
        },
        headerTitleStyle: {
          color: getThemeColor("text"),
          ...EvtFontStyles.LayoutHeader,
        },

        tabBarStyle: {
          backgroundColor: getThemeColor("background"),
          height: AppConstants.TAB_BAR_HEIGHT,
          borderTopWidth: 0,
          elevation: 0,
          display: pagesToHideTabBar.includes(page) ? "none" : "flex",
        },
        tabBarActiveTintColor: getThemeColor("tint"),
        // tabBarActiveBackgroundColor: getThemeColor("tint,
        tabBarInactiveTintColor: getThemeColor("placeholder"),
        tabBarInactiveBackgroundColor: getThemeColor("onBackground"),
        // tabBarInactiveTintColor: getThemeColor("tint,
        tabBarItemStyle: {
          borderTopEndRadius: Sizes.border.radius.xl,
          borderTopStartRadius: Sizes.border.radius.xl,
          borderWidth: 0,
          borderBottomWidth: 0,
          // shadowColor: getThemeColor("placeholder"),
          ...EvtStyles.components.cardShadow,
        },
        tabBarLabelStyle: {
          ...EvtFontStyles.Caption1,
        },
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        unmountOnBlur: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title:
            (segments[0] == "tabs" && segments[1] == "home") ||
            (segments[0] == "tabs" && !segments[1])
              ? i18n.t("headers.home")
              : "",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <BottomTabIcon icon={HomeIcon} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="customers"
        options={{
          title:
            segments[0] == "tabs" && segments[1] == "customers"
              ? i18n.t("headers.customers")
              : "",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <BottomTabIcon icon={CustomersIcon} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="occasions"
        options={{
          title:
            segments[0] == "tabs" && segments[1] == "occasions"
              ? i18n.t("occasions.occasions")
              : "",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <BottomTabIcon icon={OccasionsIcon} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title:
            segments[0] == "tabs" && segments[1] == "profile"
              ? i18n.t("headers.you")
              : "",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <EvtAvatar
              rounded
              title={
                profile?.image
                  ? profile?.full_name
                  : profile?.full_name?.charAt(0)
              }
              source={profile?.image ? { uri: profile?.image } : undefined}
              background={profile?.image ? undefined : profile?.full_name}
              size={focused ? Sizes.icon.size.sm : Sizes.icon.size.md}
              avatarContainerStyle={{
                borderWidth: 1,
                borderRadius: Sizes.border.radius.xxl,
                borderColor: getThemeColor("tint"),
                backgroundColor: "transparent",
                transform: [
                  {
                    translateY: focused ? 2 : 10,
                  },
                ],
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

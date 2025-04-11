import i18n from "@/assets/lang/i18n";
import {
  DeleteAccountIcon,
  LanguageIcon,
  LogoutIcon,
  PersonalcardIcon,
} from "@/components/icons/Icons";
import CardOption from "@/components/shared/CardOption";
import Spacer from "@/components/shared/Spacer";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import AppConstants from "@/constants/AppConstants";
import { useSession } from "@/context/BaseAuthContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as authService from "@/services/auth";
import BaseScreen from "@/utilities/screens/BaseScreen";
import { router } from "expo-router";
import React, { useState } from "react";
import { useToast } from "react-native-toast-notifications";

const SettingScreen = () => {
  const { getThemeColor } = useBaseTheme();
  const { logOutSession } = useSession();
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    const logout = async () => {
      try {
        setLoading(true);
        const response: any = await authService.logoutApi();
        logOutSession();
        setLoading(false);
        toast.show(response?.data?.message, { type: "success" });
      } catch (error: any) {
        setLoading(false);
        toast.show(error?.response?.data?.message, { type: "danger" });
      }
    };
    logout();
  };
  const options = [
    {
      index: 1,
      key: "personalInfo",
      title: i18n.t("headers.personalInfo"),
      icon: PersonalcardIcon,
      textColor: getThemeColor("text"),
      pressed: () => {
        router.push({ pathname: "/tabs/profile/personalInfo" });
      },
    },
    {
      index: 2,
      key: "changelanguage",
      title: i18n.t("forms.changeLanguage"),
      icon: LanguageIcon,
      textColor: getThemeColor("text"),
      pressed: () => {
        router.push({ pathname: "/tabs/profile/language" });
      },
    },
  ];

  const bottomOptions = [
    {
      index: 4,
      key: "signout",
      title: i18n.t("forms.signOut"),
      icon: LogoutIcon,
      textColor: getThemeColor("tint"),
      loading: loading,
      pressed: () => {
        handleLogout();
      },
    },
    {
      index: 5,
      key: "requestDelete",
      title: i18n.t("forms.deleteAccount"),
      icon: DeleteAccountIcon,
      textColor: getThemeColor("tint"),
      pressed: () => {
        handleLogout();
      },
    },
  ];
  return (
    <BaseScreen
      paddingTopOfScreen
      header
      screenText={i18n.t("headers.settings")}
    >
      <Spacer height={AppConstants.MEASURING_UNIT * 5} />
      {options.map((option) => (
        <CardOption option={option} key={option.key} />
      ))}
      <ThemeSwitcher />
      <Spacer flex />
      {bottomOptions.map((option) => (
        <CardOption option={option} key={option.key} />
      ))}
    </BaseScreen>
  );
};

export default SettingScreen;

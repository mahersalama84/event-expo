import i18n from "@/assets/lang/i18n";
import EvtStyles from "@/assets/styles/EvtStyles";
import EvtButton from "@/components/EvtComponents/EvtButton";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtView from "@/components/EvtComponents/EvtView";
import GetIcon from "@/components/icons/GetIcon";
import {
  HomeIcon,
  LoginIcon,
  LogoutIcon,
  NotFoundIcon,
} from "@/components/icons/Icons";
import Spacer from "@/components/shared/Spacer";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useSession } from "@/context/BaseAuthContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as authService from "@/services/auth";
import { getThemeColorType } from "@/types/general";
import BaseScreen from "@/utilities/screens/BaseScreen";
import { router, usePathname } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useToast } from "react-native-toast-notifications";

const NotFoundScreen = () => {
  const pathname = usePathname();
  const { session, logOutSession } = useSession();
  const { getThemeColor } = useBaseTheme();

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
  return (
    <BaseScreen>
      <Spacer flex />
      <EvtView style={styles(getThemeColor).iconContainer}>
        <NotFoundIcon size={Sizes.icon.size.lg} color={getThemeColor("tint")} />
      </EvtView>
      <EvtStyledText.SubScreenTitle textAlign="center">
        {i18n.t("app.notFound")}
      </EvtStyledText.SubScreenTitle>
      <EvtStyledText.Body textAlign="center">
        {i18n.t("app.screenNotFound")}
      </EvtStyledText.Body>

      <EvtStyledText.Body textAlign="center">{pathname}</EvtStyledText.Body>

      <Spacer flex />

      {!session && (
        <EvtButton
          containerStyle={{ flex: 1, ...EvtStyles.components.button }}
          title={i18n.t("forms.joinUs")}
          icon={
            <GetIcon
              icon={LoginIcon}
              color={getThemeColor("buttonTitleColor")}
              size={Sizes.icon.size.md}
            />
          }
          iconPosition="right"
          onPress={() => {
            router.replace({ pathname: "/auth/login" });
          }}
        />
      )}
      {session && (
        <EvtButton
          containerStyle={{
            flex: 1,
            marginBottom: 10,
            ...EvtStyles.components.button,
          }}
          type="outline"
          title={i18n.t("forms.goHome")}
          icon={
            <GetIcon
              icon={HomeIcon}
              color={getThemeColor("tint")}
              size={Sizes.icon.size.md}
            />
          }
          iconPosition="right"
          onPress={() => {
            router.replace({ pathname: "/tabs/home" });
          }}
        />
      )}
      {session && (
        <EvtButton
          containerStyle={{ flex: 1, ...EvtStyles.components.button }}
          title={i18n.t("forms.signOut")}
          loading={loading}
          icon={
            <GetIcon
              icon={LogoutIcon}
              color={getThemeColor("buttonTitleColor")}
              size={Sizes.icon.size.md}
            />
          }
          iconPosition="right"
          onPress={() => {
            handleLogout();
          }}
        />
      )}
    </BaseScreen>
  );
};

export default NotFoundScreen;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    iconContainer: {
      alignSelf: "center",
      padding: Sizes.padding.md,
      marginBottom: Sizes.margin.md,
      backgroundColor: getThemeColor("onBackground"),
      borderRadius: AppConstants.MEASURING_UNIT * 0.75,
    },
  });

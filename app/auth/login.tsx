import i18n from "@/assets/lang/i18n";
import EvtStyles from "@/assets/styles/EvtStyles";
import EvtButton from "@/components/EvtComponents/EvtButton";
import EvtLineOverText from "@/components/EvtComponents/EvtLineOverText";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtTextInput from "@/components/EvtComponents/EvtTextInput";
import Spacer from "@/components/shared/Spacer";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as authService from "@/services/auth";
import { useMobilePrefixStore } from "@/stores/MobilePrefixStore";
import SelectedMobilePrefix from "@/utilities/auth/SelectedMobilePrefix";
import BaseScreen from "@/utilities/screens/BaseScreen";
import { router } from "expo-router";
import * as React from "react";
import { useState } from "react";
import { Keyboard } from "react-native";
import { useToast } from "react-native-toast-notifications";

const LoginScreen = () => {
  const { getThemeColor } = useBaseTheme();
  const { openBaseBottomSheet, BaseBottomSheet } = useBaseBottomSheet();
  const toast = useToast();

  const mobilePrefix = useMobilePrefixStore((state) => state.mobilePrefix);

  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState<string | undefined>(undefined);
  const [valid, setValid] = useState<boolean | null>(false);

  const onChangeText = (value: string) => {
    value = value
      .split(" ")
      .join("")
      .split("-")
      .join("")
      .split(".")
      .join("")
      .split(",")
      .join("");

    if (value.length < 9) setValid(false);
    else {
      setValid(true);
      Keyboard.dismiss();
    }
    setMobile(value);
  };
  const onSubmit = () => {
    const fetchOtp = async () => {
      try {
        setLoading(true);
        let prefix = mobilePrefix;
        const response: any = await authService.otpLoginApi(prefix, mobile);
        let passedOTP = response?.data.otp;
        router.push({
          pathname: "/auth/otp",
          params: { mobile, passedOTP },
        });
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        if (error?.response?.data?.message)
          toast.show(error?.response?.data?.message, { type: "danger" });
        else toast.show(error?.message, { type: "danger" });
      }
    };
    fetchOtp();
  };

  return (
    <>
      <BaseScreen paddingTopOfScreen>
        <Spacer height={AppConstants.MEASURING_UNIT * 5} />
        <EvtStyledText.ScreenTitle>
          {i18n.t("body.welcome")}
        </EvtStyledText.ScreenTitle>
        <EvtStyledText.SubScreenTitle>
          {i18n.t("body.loginToYourAccount")}
        </EvtStyledText.SubScreenTitle>

        <Spacer height={AppConstants.MEASURING_UNIT * 5} />

        <EvtTextInput
          shadow={true}
          autoFocus
          reverse
          placeholder={i18n.t("forms.mobile")}
          onChangeText={onChangeText}
          value={mobile}
          prefixAddHoc={
            <SelectedMobilePrefix
              reverse
              color={getThemeColor("tint")}
              style={{ paddingHorizontal: Sizes.padding.md }}
            />
          }
          keyboardType="numeric"
          maxLength={9}
        />

        <Spacer height={AppConstants.MEASURING_UNIT * 5} />

        <EvtButton
          containerStyle={{ flex: 1, ...EvtStyles.components.button }}
          title={i18n.t("forms.signIn")}
          loading={loading}
          disabled={loading || !valid}
          iconPosition="right"
          onPress={onSubmit}
        />
        <Spacer height={AppConstants.MEASURING_UNIT * 5} />

        <EvtLineOverText text="or"></EvtLineOverText>
        <EvtStyledText.Body
          textAlign="center"
          style={{ marginBottom: Sizes.margin.md }}
        >
          {i18n.t("forms.youDontHaveAnAccount")}
        </EvtStyledText.Body>

        <EvtButton
          containerStyle={{ flex: 1, ...EvtStyles.components.button }}
          title={i18n.t("forms.signUp")}
          type="clear"
          onPress={() => {
            router.push({
              pathname: "/auth/signup",
            });
          }}
        />
        <EvtButton
          containerStyle={{ flex: 1, ...EvtStyles.components.button }}
          title={i18n.t("forms.continueAsGuest")}
          type="clear"
          onPress={() => {
            router.replace({
              pathname: "/guest",
            });
          }}
        />
        <Spacer flex />
        <EvtStyledText.Body textAlign="center">
          {i18n.t("forms.byUsingOurServices")}
        </EvtStyledText.Body>
        <EvtButton
          containerStyle={{ flex: 1, ...EvtStyles.components.button }}
          title={i18n.t("forms.termsAndConditions")}
          type="clear"
          onPress={() => {
            router.push({
              pathname: "/auth/tcs",
            });
          }}
        />
      </BaseScreen>
      {BaseBottomSheet}
    </>
  );
};

export default LoginScreen;

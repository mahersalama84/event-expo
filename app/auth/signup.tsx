import i18n from "@/assets/lang/i18n";
import EvtStyles from "@/assets/styles/EvtStyles";
import EvtButton from "@/components/EvtComponents/EvtButton";
import EvtLineOverText from "@/components/EvtComponents/EvtLineOverText";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtTextInput from "@/components/EvtComponents/EvtTextInput";
import { EmailIcon, TextIcon } from "@/components/icons/Icons";
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

const SignupScreen = () => {
  const { getThemeColor } = useBaseTheme();
  const { BaseBottomSheet } = useBaseBottomSheet();
  const toast = useToast();

  const mobilePrefix = useMobilePrefixStore((state) => state.mobilePrefix);

  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [firstName, setFirstName] = useState<string | undefined>(undefined);
  const [lastName, setLastName] = useState<string | undefined>(undefined);
  const [valid, setValid] = useState<boolean | null>(false);

  const onChangeMobileText = (value: string) => {
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

  const onChangeEmailText = (value: string) => {
    setEmail(value);
  };

  const onChangeFirstNameText = (value: string) => {
    setFirstName(value);
  };
  const onChangeLastNameText = (value: string) => {
    setLastName(value);
  };

  const onSubmit = () => {
    let first_name = firstName;
    let last_name = lastName;
    const fetchOtp = async () => {
      try {
        setLoading(true);
        let prefix = mobilePrefix;
        const response: any = await authService.otpGuestApi(
          prefix,
          first_name,
          last_name,
          mobile,
          email
        );
        let passedOTP = response?.data?.otp;
        router.push({
          pathname: "/auth/otp",
          params: { mobile, passedOTP },
        });
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        toast.show(error?.response?.data?.message, { type: "danger" });
      }
    };
    fetchOtp();
  };

  return (
    <>
      <BaseScreen
        paddingTopOfScreen
        header
        screenText={i18n.t("headers.personalInfo")}
      >
        <Spacer height={AppConstants.MEASURING_UNIT * 5} />
        <EvtTextInput
          shadow={true}
          autoFocus
          reverse
          placeholder={i18n.t("forms.mobile")}
          onChangeText={onChangeMobileText}
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

        <EvtTextInput
          shadow={true}
          placeholder={i18n.t("forms.email")}
          onChangeText={onChangeEmailText}
          value={email}
          prefixIcon={{ component: EmailIcon }}
          maxLength={30}
        />

        <EvtTextInput
          shadow={true}
          placeholder={i18n.t("forms.firstName")}
          onChangeText={onChangeFirstNameText}
          value={firstName}
          prefixIcon={{ component: TextIcon }}
          maxLength={30}
        />

        <EvtTextInput
          shadow={true}
          placeholder={i18n.t("forms.lastName")}
          onChangeText={onChangeLastNameText}
          value={lastName}
          prefixIcon={{ component: TextIcon }}
          maxLength={30}
        />

        <Spacer height={AppConstants.MEASURING_UNIT * 5} />
        <EvtButton
          containerStyle={{ flex: 1, ...EvtStyles.components.button }}
          title={i18n.t("forms.next")}
          loading={loading}
          disabled={loading || !mobile || !firstName || !lastName || !valid}
          iconPosition="right"
          onPress={onSubmit}
        />

        <Spacer height={AppConstants.MEASURING_UNIT * 5} />
        <EvtLineOverText text="or"></EvtLineOverText>
        <EvtStyledText.Body
          textAlign="center"
          style={{ marginBottom: Sizes.margin.md }}
        >
          {i18n.t("forms.youHaveAnAccount")}
        </EvtStyledText.Body>

        <EvtButton
          containerStyle={{ flex: 1, ...EvtStyles.components.button }}
          title={i18n.t("forms.signIn")}
          type="clear"
          onPress={() => {
            router.push({
              pathname: "/auth/login",
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

export default SignupScreen;

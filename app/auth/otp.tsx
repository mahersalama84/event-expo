import i18n from "@/assets/lang/i18n";
import EvtOtp from "@/components/EvtComponents/EvtOtp";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import CountDownOtp from "@/components/shared/CountDownOtp";
import MediumLoading from "@/components/shared/MediumLoading";
import Spacer from "@/components/shared/Spacer";
import AppConstants from "@/constants/AppConstants";
import { useSession } from "@/context/BaseAuthContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as authService from "@/services/auth";
import { useMobilePrefixStore } from "@/stores/MobilePrefixStore";
import BaseScreen from "@/utilities/screens/BaseScreen";
import { router, useLocalSearchParams } from "expo-router";
import * as React from "react";
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";

const OtpScreen = () => {
  const { getThemeColor } = useBaseTheme();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [newOtp, setNewOtp] = useState(null);
  const { logInSession } = useSession();
  const { mobile, passedOTP } = useLocalSearchParams();
  const mobilePrefix = useMobilePrefixStore((state) => state.mobilePrefix);

  const handleSubmit = async (password: number) => {
    const logIN = async () => {
      try {
        setFailed(false);
        setLoading(true);
        let prefix = mobilePrefix;
        const response: any = await authService.loginApi(
          prefix,
          mobile,
          password
        );
        let token = response?.data?.token;
        let customer = response?.data?.customer;
        logInSession(token, customer);
        setLoading(false);
        router.replace({ pathname: "/tabs" });
      } catch (error: any) {
        setLoading(false);
        setFailed(true);
        toast.show(error?.response?.data?.message, { type: "danger" });
      }
    };
    logIN();
  };

  const otpChangeHandle = (otp: number) => {
    if (otp.toString().length === 4) handleSubmit(otp);
  };

  const lastTowNumbers = mobile
    ?.toString()
    .substring(mobile.length - 2, mobile.length);

  const secureNumber = "+" + mobilePrefix + " *** **** *" + lastTowNumbers;

  const resendOtp = (otp: number) => {
    setNewOtp(otp);
    setFailed(false);
  };
  useEffect(() => {
    setNewOtp(passedOTP);
  }, [passedOTP]);
  return (
    <BaseScreen paddingTopOfScreen header screenText={i18n.t("headers.OTP")}>
      <Spacer height={AppConstants.MEASURING_UNIT * 5} />
      <EvtStyledText.ScreenTitle>
        {i18n.t("forms.enterCode")}
      </EvtStyledText.ScreenTitle>

      <Spacer height={AppConstants.MEASURING_UNIT * 5} />

      <EvtStyledText.Body>
        {i18n.t("forms.enterSendedOtp")}{" "}
        <EvtStyledText.Body color={getThemeColor("tint")}>
          {newOtp}
        </EvtStyledText.Body>
      </EvtStyledText.Body>
      <Spacer height={AppConstants.MEASURING_UNIT} />
      <EvtStyledText.Body>{secureNumber}</EvtStyledText.Body>
      <Spacer height={AppConstants.MEASURING_UNIT * 5} />

      {loading ? (
        <MediumLoading />
      ) : failed ? (
        <CountDownOtp mobile={mobile} resendOtp={resendOtp} />
      ) : (
        <EvtOtp numberOfInputs={4} autoFocus onFinish={otpChangeHandle} />
      )}
    </BaseScreen>
  );
};

export default OtpScreen;

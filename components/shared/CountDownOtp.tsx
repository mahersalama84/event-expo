import CountDownAnimation from "@/animations/CountDownOtpAnimation";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as authService from "@/services/auth";
import { CountDownOtpType, getThemeColorType } from "@/types/general";
import SharedFunctions from "@/utilities/SharedFunctions";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { useToast } from "react-native-toast-notifications";
import EvtStyledText from "../EvtComponents/EvtStyledText";
import EvtView from "../EvtComponents/EvtView";
import GetIcon from "../icons/GetIcon";
import { RefreshIcon } from "../icons/Icons";
import MediumLoading from "./MediumLoading";
import { useMobilePrefixStore } from "@/stores/MobilePrefixStore";

const CountDownOtp = ({ mobile, resendOtp }: CountDownOtpType) => {
  const mobilePrefix = useMobilePrefixStore((state) => state.mobilePrefix);
  const MAX_MINUTES = 2;
  const MAX_SECONDS = MAX_MINUTES * 60 - 1;

  const [timer, setTimer] = useState(MAX_SECONDS);
  const { getThemeColor } = useBaseTheme();
  const [loading, setLoading] = useState(false);

  const secondsChanged = useSharedValue<boolean>(false);

  const toast = useToast();

  useEffect(() => {
    let interval = setInterval(() => {
      secondsChanged.value = !secondsChanged.value;
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onResendOtp = () => {
    let prefix = mobilePrefix;
    const fetchOtp = async () => {
      try {
        setLoading(true);
        const response: any = await authService.otpLoginApi(prefix, mobile);
        resendOtp(response?.data.otp);

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
      {timer > 0 && !loading && (
        <EvtView style={styles(getThemeColor).timesContainer}>
          <EvtView style={styles(getThemeColor).textContainer}>
            <EvtStyledText.Body>
              {SharedFunctions.addZeroToNumber(
                parseInt((timer / 60).toString())
              )}
            </EvtStyledText.Body>
          </EvtView>
          <EvtStyledText.Body>:</EvtStyledText.Body>
          <EvtView style={styles(getThemeColor).textContainer}>
            <CountDownAnimation valueChanged={secondsChanged}>
              <EvtStyledText.Body>
                {SharedFunctions.addZeroToNumber(
                  timer - parseInt((timer / 60).toString()) * 60
                )}
              </EvtStyledText.Body>
            </CountDownAnimation>
          </EvtView>
        </EvtView>
      )}
      {timer == 0 && !loading && (
        <TouchableOpacity
          onPress={onResendOtp}
          style={styles(getThemeColor).timesContainer}
        >
          <GetIcon
            size={Sizes.icon.size.lg}
            color={getThemeColor("tint")}
            icon={RefreshIcon}
          />
        </TouchableOpacity>
      )}
      {loading && <MediumLoading />}
    </>
  );
};

export default CountDownOtp;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    timesContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignSelf: "center",
    },
    textContainer: {
      maxWidth: 60,
      maxHeight: 60,
      borderRadius: Sizes.border.radius.sm,
      borderWidth: 1,
      borderColor: getThemeColor("text"),
      flex: 0.5,
      alignItems: "center",
      marginHorizontal: Sizes.margin.sm,
      padding: Sizes.padding.md,
      backgroundColor: getThemeColor("placeholder"),
    },
  });

import CountDownAnimation from "@/animations/CountDownOtpAnimation";
import i18n from "@/assets/lang/i18n";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { getThemeColorType } from "@/types/general";
import SharedFunctions from "@/utilities/SharedFunctions";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import EvtEmptyList from "../EvtComponents/EvtEmptyList";
import EvtStyledText from "../EvtComponents/EvtStyledText";
import EvtView from "../EvtComponents/EvtView";
import { OccasionsIcon } from "../icons/Icons";

const CountDownOccasion = ({
  occasionDate,
}: {
  occasionDate: string | undefined;
}) => {
  const { getThemeColor } = useBaseTheme();
  const secondsChanged = useSharedValue(false);

  // occasionDate = new Date(occasionDate).toUTCString();

  let countDownDate = new Date(occasionDate).getTime();

  const [expired, setExpired] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      secondsChanged.value = !secondsChanged.value;
      var offset = new Date().getTimezoneOffset();
      var now = new Date().getTime() - offset * 60 * 1000;
      var distance = countDownDate - now;
      if (distance < 0) {
        setExpired(true);
        return;
      }
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {expired ? (
        <EvtView style={styles(getThemeColor).timesContainer}>
          <EvtEmptyList
            text={i18n.t("occasions.expired")}
            description={i18n.t("occasions.expiredDescription")}
            icon={OccasionsIcon}
          />
        </EvtView>
      ) : (
        <EvtView style={styles(getThemeColor).timesContainer}>
          <EvtView style={styles(getThemeColor).textContainer}>
            <EvtStyledText.Body>
              {SharedFunctions.addZeroToNumber(days)}
            </EvtStyledText.Body>
          </EvtView>
          <EvtStyledText.Body>:</EvtStyledText.Body>
          <EvtView style={styles(getThemeColor).textContainer}>
            <EvtStyledText.Body>
              {SharedFunctions.addZeroToNumber(hours)}
            </EvtStyledText.Body>
          </EvtView>
          <EvtStyledText.Body>:</EvtStyledText.Body>
          <EvtView style={styles(getThemeColor).textContainer}>
            <EvtStyledText.Body>
              {SharedFunctions.addZeroToNumber(minutes)}
            </EvtStyledText.Body>
          </EvtView>
          <EvtStyledText.Body>:</EvtStyledText.Body>
          <EvtView style={styles(getThemeColor).textContainer}>
            <CountDownAnimation valueChanged={secondsChanged}>
              <EvtStyledText.Body>
                {SharedFunctions.addZeroToNumber(seconds)}
              </EvtStyledText.Body>
            </CountDownAnimation>
          </EvtView>
        </EvtView>
      )}
    </>
  );
};

export default CountDownOccasion;

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

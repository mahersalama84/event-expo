import i18n from "@/assets/lang/i18n";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import BaseScreen from "@/utilities/screens/BaseScreen";

const TcsScreen = () => {
  return (
    <BaseScreen
      paddingTopOfScreen
      header
      headerText={i18n.t("headers.tcs")}
      screenText={i18n.t("headers.tcs")}
    >
      <EvtStyledText.Body>TCS</EvtStyledText.Body>
    </BaseScreen>
  );
};

export default TcsScreen;

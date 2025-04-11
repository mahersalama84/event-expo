import i18n from "@/assets/lang/i18n";
import EvtConfirmDialog from "@/components/EvtComponents/EvtConfirmDialog";
import { TickSquareIcon } from "@/components/icons/Icons";
import CardOption from "@/components/shared/CardOption";
import Spacer from "@/components/shared/Spacer";
import AppConstants from "@/constants/AppConstants";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { useLanguageStore } from "@/stores/LanguageStore";
import BaseScreen from "@/utilities/screens/BaseScreen";
import { Restart } from "fiction-expo-restart";
import React, { useEffect, useState } from "react";

const LanguageScreen = () => {
  const { getThemeColor } = useBaseTheme();

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [restarting, setRestarting] = useState(false);
  const [confirmRestartVisible, setConfirmRestartVisible] = useState(false);

  const changeLanguage = useLanguageStore((state) => state.changeLanguage);

  const language = useLanguageStore((state) => state.language);

  const options = [
    {
      index: 1,
      noReverse: true,
      key: "en",
      textColor:
        selectedLanguage == "en"
          ? getThemeColor("tint")
          : getThemeColor("text"),
      title: "English",
      icon: TickSquareIcon,
      pressed: () => {
        if (language != "en") {
          setSelectedLanguage("en");
          setConfirmRestartVisible(true);
        }
      },
    },
    {
      index: 2,
      noReverse: true,
      key: "ar",
      textColor:
        selectedLanguage == "ar"
          ? getThemeColor("tint")
          : getThemeColor("text"),
      title: "العربية",
      icon: TickSquareIcon,
      pressed: () => {
        if (language != "ar") {
          setSelectedLanguage("ar");
          setConfirmRestartVisible(true);
        }
      },
    },
  ];
  useEffect(() => {
    setSelectedLanguage(language);
  }, []);

  const confirmRestart = () => {
    changeLanguage(selectedLanguage);
    setConfirmRestartVisible(false);
    Restart();
  };

  return (
    <BaseScreen
      paddingTopOfScreen
      header
      screenText={i18n.t("headers.selectLanguage")}
    >
      <Spacer height={AppConstants.MEASURING_UNIT * 5} />
      {options.map((option) => (
        <CardOption option={option} key={option.key} />
      ))}

      <EvtConfirmDialog
        confirming={restarting}
        setConfirming={setRestarting}
        message={i18n.t("forms.restartConfirm")}
        subMessage={i18n.t("forms.restartDialogMessage")}
        visible={confirmRestartVisible}
        confirmed={confirmRestart}
        closed={() => {
          if (selectedLanguage == "ar") setSelectedLanguage("en");
          if (selectedLanguage == "en") setSelectedLanguage("ar");
          setConfirmRestartVisible(false);
        }}
        confirmButtonText={i18n.t("forms.ok")}
        confirmButtonColor={getThemeColor("errorText")}
      />
    </BaseScreen>
  );
};

export default LanguageScreen;

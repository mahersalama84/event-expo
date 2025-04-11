import i18n from "@/assets/lang/i18n";
import BaseScreen from "@/utilities/screens/BaseScreen";

const NotificationsScreen = () => {
  return (
    <BaseScreen
      paddingTopOfScreen
      header
      screenText={i18n.t("headers.notifications")}
    ></BaseScreen>
  );
};

export default NotificationsScreen;

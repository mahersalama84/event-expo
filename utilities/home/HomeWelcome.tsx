import ButtonHeaderAnimation from "@/animations/ButtonHeaderAnimation";
import i18n from "@/assets/lang/i18n";
import EvtFontStyles from "@/assets/styles/EvtFontStyles";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtTouchable from "@/components/EvtComponents/EvtTouchable";
import EvtView from "@/components/EvtComponents/EvtView";
import GetIcon from "@/components/icons/GetIcon";
import { NotificationIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { useProfileStore } from "@/stores/ProfileStore";
import { HomeWelcomeType } from "@/types/general";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Badge } from "react-native-elements";

const HomeWelcome = ({ textColor, scrollY }: HomeWelcomeType) => {
  const { getThemeColor } = useBaseTheme();
  const profile = useProfileStore((state) => state.profile);

  return (
    <EvtView style={styles.header}>
      <EvtStyledText.ScreenTitle
        color={textColor}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {i18n.t("body.welcome")} {profile?.first_name}
      </EvtStyledText.ScreenTitle>
      <ButtonHeaderAnimation scrollY={scrollY}>
        <EvtTouchable
          handleSingleTap={() =>
            router.push({ pathname: "/tabs/home/notifications" })
          }
        >
          <Badge
            status="error"
            containerStyle={{ position: "absolute", top: 0, right: 0 }}
            badgeStyle={{
              width: 15,
              height: 15,
              borderRadius: 50,
            }}
            textStyle={{
              ...EvtFontStyles.Caption3,
              textAlignVertical: "center",
            }}
            value="+5"
          />
          <GetIcon
            variant="Bulk"
            icon={NotificationIcon}
            color={getThemeColor("tint")}
            size={Sizes.icon.size.md}
          />
        </EvtTouchable>
      </ButtonHeaderAnimation>
    </EvtView>
  );
};

export default HomeWelcome;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: AppConstants.MEASURING_UNIT,
    backgroundColor: "transparent",
    alignItems: "center",
  },
});

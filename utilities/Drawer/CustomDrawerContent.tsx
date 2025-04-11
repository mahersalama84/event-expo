import i18n from "@/assets/lang/i18n";
import EvtFontStyles from "@/assets/styles/EvtFontStyles";
import EvtAvatar from "@/components/EvtComponents/EvtAvatar";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtView from "@/components/EvtComponents/EvtView";
import GetIcon from "@/components/icons/GetIcon";
import {
  CustomersIcon,
  HomeIcon,
  OccasionsIcon,
  SettingsIcon,
  WishesIcon,
} from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { useAttendesStore } from "@/stores/AttendeStore";
import { useMyOccasionsStore } from "@/stores/MyOccasionsStore";
import { useMyWishesStore } from "@/stores/MyWishesStore";
import { useNavigationStore } from "@/stores/NavigationStore";
import { useOtherOccasionsStore } from "@/stores/OtherOccasionsStore";
import { getThemeColorType } from "@/types/general";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { router, useNavigation, useSegments } from "expo-router";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomDrawerContent = (props: any) => {
  const segments = useSegments();
  const { getThemeColor } = useBaseTheme();
  const { top, bottom } = useSafeAreaInsets();
  const { closeBaseBottomSheet } = useBaseBottomSheet();
  const navigation = useNavigation();

  const myOccasion = useMyOccasionsStore((state) => state.selectedOccasion);
  const otherOccasion = useOtherOccasionsStore(
    (state) => state.selectedOccasion
  );

  const selectedOccasion = myOccasion?.id ? myOccasion : otherOccasion;

  const clearWishes = useMyWishesStore((state) => state.clearWishes);
  const unSelectWish = useMyWishesStore((state) => state.unSelectWish);
  const unSelectAttende = useAttendesStore((state) => state.unSelectAttende);

  const unSelectMyOccasion = useMyOccasionsStore(
    (state) => state.unSelectOccasion
  );

  const unSelectOtherOccasion = useOtherOccasionsStore(
    (state) => state.unSelectOccasion
  );

  const clearMyOccasions = useMyOccasionsStore((state) => state.clearOccasions);
  const clearOtherOccasions = useMyOccasionsStore(
    (state) => state.clearOccasions
  );

  const nav = useNavigationStore((state) => state.nav);
  return (
    <EvtView style={styles(getThemeColor, top, bottom).container}>
      <LinearGradient
        colors={[
          getThemeColor("placeholder"),
          getThemeColor("background"),
          getThemeColor("placeholder"),
          getThemeColor("background"),
          getThemeColor("placeholder"),
          getThemeColor("background"),
        ]}
        start={[0, 1]}
        end={[1, 0]}
        style={styles(getThemeColor, top, bottom).itemsContainer}
      >
        <EvtView style={styles(getThemeColor, top, bottom).header}>
          <EvtAvatar
            rounded
            title={
              selectedOccasion?.customer?.image
                ? selectedOccasion?.customer?.full_name
                : selectedOccasion?.customer?.full_name?.charAt(0)
            }
            source={
              selectedOccasion?.customer?.image
                ? { uri: selectedOccasion?.customer.image }
                : undefined
            }
            background={
              selectedOccasion?.customer?.image
                ? undefined
                : selectedOccasion?.customer?.full_name
            }
            size={Sizes.icon.size.xxxl}
            avatarContainerStyle={{ backgroundColor: "transparent" }}
          />
          <EvtStyledText.ScreenTitle
            textAlign="center"
            color={getThemeColor("tint")}
            style={{ padding: Sizes.padding.md }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {selectedOccasion?.customer?.full_name}
          </EvtStyledText.ScreenTitle>

          <EvtStyledText.SubScreenTitle
            textAlign="center"
            color={getThemeColor("tint")}
          >
            {selectedOccasion?.customer?.mobile_no}
          </EvtStyledText.SubScreenTitle>
        </EvtView>
        <DrawerContentScrollView
          {...props}
          scrollEnabled={false}
          contentContainerStyle={{ flex: 1 }}
        >
          <DrawerItem
            label={i18n.t("occasions.occasion")}
            labelStyle={{
              ...EvtFontStyles.BodyBold,
              marginLeft: -AppConstants.MEASURING_UNIT * 2,
            }}
            inactiveTintColor={getThemeColor("tint")}
            activeTintColor={getThemeColor("buttonTitleColor")}
            inactiveBackgroundColor={getThemeColor("onBackground")}
            activeBackgroundColor={getThemeColor("tint")}
            pressColor={getThemeColor("backdrop")}
            icon={({ color }) => (
              <GetIcon
                variant="Bulk"
                icon={OccasionsIcon}
                color={color}
                size={Sizes.icon.size.md}
              />
            )}
            focused={
              segments[0] == "drawer" && segments[1] == "occasion"
                ? true
                : false
            }
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
              router.push({ pathname: "/drawer/occasion" });
            }}
          />
          <DrawerItem
            label={
              i18n.t("occasions.attendence") +
              " (" +
              selectedOccasion?.attendence_ids.length +
              ")"
            }
            labelStyle={{
              ...EvtFontStyles.BodyBold,
              marginLeft: -AppConstants.MEASURING_UNIT * 2,
            }}
            inactiveTintColor={getThemeColor("tint")}
            activeTintColor={getThemeColor("buttonTitleColor")}
            inactiveBackgroundColor={getThemeColor("onBackground")}
            activeBackgroundColor={getThemeColor("tint")}
            pressColor={getThemeColor("backdrop")}
            icon={({ color }) => (
              <GetIcon
                variant="Bulk"
                icon={CustomersIcon}
                color={color}
                size={Sizes.icon.size.md}
              />
            )}
            focused={
              segments[0] == "drawer" && segments[1] == "attendence"
                ? true
                : false
            }
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
              router.push({ pathname: "/drawer/attendence" });
            }}
          />
          <DrawerItem
            label={
              i18n.t("wishes.wishes") +
              " (" +
              selectedOccasion?.wishes_count +
              ")"
            }
            labelStyle={{
              ...EvtFontStyles.BodyBold,
              marginLeft: -AppConstants.MEASURING_UNIT * 2,
            }}
            inactiveTintColor={getThemeColor("tint")}
            activeTintColor={getThemeColor("buttonTitleColor")}
            inactiveBackgroundColor={getThemeColor("onBackground")}
            activeBackgroundColor={getThemeColor("tint")}
            pressColor={getThemeColor("backdrop")}
            icon={({ color }) => (
              <GetIcon
                variant="Bulk"
                icon={WishesIcon}
                color={color}
                size={Sizes.icon.size.md}
              />
            )}
            focused={
              segments[0] == "drawer" && segments[1] == "wishes" ? true : false
            }
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
              router.push({ pathname: "/drawer/wishes" });
            }}
          />
          <DrawerItem
            label={i18n.t("headers.profile")}
            labelStyle={{
              ...EvtFontStyles.BodyBold,
              marginLeft: -AppConstants.MEASURING_UNIT * 2,
            }}
            inactiveTintColor={getThemeColor("tint")}
            inactiveBackgroundColor={getThemeColor("onBackground")}
            activeBackgroundColor={getThemeColor("tint")}
            pressColor={getThemeColor("backdrop")}
            icon={({ color }) => (
              <GetIcon
                variant="Bulk"
                icon={SettingsIcon}
                color={color}
                size={Sizes.icon.size.md}
              />
            )}
            onPress={() => {
              unSelectAttende();
              unSelectWish();
              unSelectMyOccasion();
              unSelectOtherOccasion();
              clearWishes();
              clearMyOccasions();
              clearOtherOccasions();
              closeBaseBottomSheet();
              router.replace({ pathname: "/tabs/profile" });
            }}
          />
          <DrawerItem
            label={i18n.t("headers.home")}
            labelStyle={{
              ...EvtFontStyles.BodyBold,
              marginLeft: -AppConstants.MEASURING_UNIT * 2,
            }}
            inactiveTintColor={getThemeColor("tint")}
            inactiveBackgroundColor={getThemeColor("onBackground")}
            activeBackgroundColor={getThemeColor("tint")}
            pressColor={getThemeColor("backdrop")}
            icon={({ color }) => (
              <GetIcon
                variant="Bulk"
                icon={HomeIcon}
                color={color}
                size={Sizes.icon.size.md}
              />
            )}
            onPress={() => {
              unSelectAttende();
              unSelectWish();
              unSelectMyOccasion();
              unSelectOtherOccasion();
              clearWishes();
              clearMyOccasions();
              clearOtherOccasions();
              closeBaseBottomSheet();
              router.replace({ pathname: "/tabs" });
            }}
          />
        </DrawerContentScrollView>
      </LinearGradient>
      <LinearGradient
        colors={[getThemeColor("placeholder"), getThemeColor("background")]}
        start={[0, 1]}
        end={[1, 0]}
        style={styles(getThemeColor, top, bottom).footer}
      >
        <EvtStyledText.SubScreenTitle color={getThemeColor("tint")}>
          {i18n.t("app.name")} - {new Date().getFullYear()}
        </EvtStyledText.SubScreenTitle>
      </LinearGradient>
    </EvtView>
  );
};

export default CustomDrawerContent;

const styles = (
  getThemeColor: getThemeColorType,
  top: number,
  bottom: number
) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      alignSelf: "center",
      paddingTop: Sizes.padding.md * 2 + top,
      backgroundColor: "transparent",
    },
    itemsContainer: {
      flex: 1,
    },
    footer: {
      backgroundColor: getThemeColor("placeholder"),
      borderTopColor: getThemeColor("tint"),
      borderTopWidth: 1,
      padding: Sizes.padding.md * 2,
      // paddingBottom: Sizes.padding.md * 2 + bottom,
    },
  });

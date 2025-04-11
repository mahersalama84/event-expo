import i18n from "@/assets/lang/i18n";
import EvtFontStyles from "@/assets/styles/EvtFontStyles";
import EvtAvatar from "@/components/EvtComponents/EvtAvatar";
import EvtView from "@/components/EvtComponents/EvtView";
import { CustomersIcon } from "@/components/icons/Icons";
import Spacer from "@/components/shared/Spacer";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { useProfileStore } from "@/stores/ProfileStore";
import { getThemeColorType, ProfileHeaderAnimationType } from "@/types/general";
import SettingsButton from "@/utilities/profile/SettingsButton";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import CountsAnimation from "./CountsAnimation";

const ProfileHeaderAnimation = ({ scrollY }: ProfileHeaderAnimationType) => {
  const { getThemeColor } = useBaseTheme();
  const profile = useProfileStore((state) => state.profile);

  const headerStyles = useAnimatedStyle(() => {
    return {
      paddingTop: interpolate(
        scrollY.value,
        [0, AppConstants.SCROLL_THRESHOLD],
        [AppConstants.TOP_OF_SCREEN * 2, AppConstants.TOP_OF_SCREEN],
        Extrapolation.CLAMP
      ),
    };
  });
  const textStyles = useAnimatedStyle(() => {
    return {
      lineHeight:
        scrollY.value >= AppConstants.SCROLL_THRESHOLD
          ? withSpring(34)
          : withSpring(24),
      fontSize:
        scrollY.value >= AppConstants.SCROLL_THRESHOLD
          ? withSpring(24)
          : withSpring(20),
      marginLeft:
        scrollY.value >= AppConstants.SCROLL_THRESHOLD
          ? withSpring(-15)
          : withSpring(0),
    };
  });
  const mobileStyles = useAnimatedStyle(() => {
    return {
      display: scrollY.value <= AppConstants.SCROLL_THRESHOLD ? "flex" : "none",
    };
  });
  const imageStyle = useAnimatedStyle(() => ({
    marginLeft:
      scrollY.value >= AppConstants.SCROLL_THRESHOLD
        ? withSpring(-20)
        : withSpring(0),
    transform: [
      {
        scale:
          scrollY.value >= AppConstants.SCROLL_THRESHOLD
            ? withSpring(0.6)
            : withSpring(1.0),
      },
    ],
  }));

  return (
    <LinearGradient
      colors={[getThemeColor("placeholder"), getThemeColor("background")]}
      start={[0, 1]}
      end={[1, 0]}
      locations={[0.5, 1.0]}
    >
      <Animated.View style={[headerStyles, styles(getThemeColor).container]}>
        <EvtView style={styles(getThemeColor).header}>
          <Animated.View style={imageStyle}>
            <EvtAvatar
              rounded
              title={
                profile?.image
                  ? profile?.full_name
                  : profile?.full_name?.charAt(0)
              }
              source={profile?.image ? { uri: profile?.image } : undefined}
              background={profile?.image ? undefined : profile?.full_name}
              size={Sizes.icon.size.xxxl}
              avatarContainerStyle={{ backgroundColor: "transparent" }}
              badgeBottom={true}
              badgeSize={Sizes.icon.size.xsm}
              badgeStatus={profile?.is_active}
            />
          </Animated.View>
          <EvtView style={styles(getThemeColor).headerTextContainer}>
            <Animated.Text
              style={[textStyles, styles(getThemeColor).headerText]}
            >
              {profile?.full_name}
            </Animated.Text>
            <Animated.Text
              style={[
                textStyles,
                mobileStyles,
                styles(getThemeColor).headerText,
              ]}
            >
              {profile?.mobile_no}
            </Animated.Text>
          </EvtView>
          <Spacer flex />
          <SettingsButton scrollY={scrollY} />
        </EvtView>
        <EvtView style={styles(getThemeColor).countsContainer}>
          <CountsAnimation
            scrollY={scrollY}
            icon={CustomersIcon}
            iconColor={getThemeColor("text")}
            iconSize={Sizes.icon.size.xs}
            title={i18n.t("friends.followings")}
            value={profile?.followings_count}
            index={2}
            handlePress={() => {
              if (profile?.followings_count > 0)
                router.push({
                  pathname: "/friends/followings",
                  params: { customer_id: profile?.id },
                });
            }}
          />
          <CountsAnimation
            scrollY={scrollY}
            icon={CustomersIcon}
            iconColor={getThemeColor("text")}
            iconSize={Sizes.icon.size.xs}
            title={i18n.t("friends.followers")}
            value={profile?.followers_count}
            index={2}
            handlePress={() => {
              if (profile?.followers_count > 0)
                router.push({
                  pathname: "/friends/followers",
                  params: { customer_id: profile?.id },
                });
            }}
          />
        </EvtView>
      </Animated.View>
    </LinearGradient>
  );
};
export default ProfileHeaderAnimation;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: AppConstants.MEASURING_UNIT,
      paddingBottom: AppConstants.TOP_OF_SCREEN * 2,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "transparent",
    },
    headerTextContainer: {
      backgroundColor: "transparent",
      marginLeft: AppConstants.MEASURING_UNIT,
    },
    headerText: {
      textAlign: "left",
      color: getThemeColor("tint"),
      ...EvtFontStyles.SubScreenTitle,
    },
    countsContainer: {
      flexDirection: "row",
      position: "absolute",
      backgroundColor: "transparent",
      bottom: 0,
      left: Sizes.margin.md,
      overflow: "visible",
    },
  });

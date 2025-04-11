import AppConstants from "@/constants/AppConstants";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as customerService from "@/services/customer";
import * as generalService from "@/services/general";
import { useAdvertisementStore } from "@/stores/AdvertisementsStore";
import { useLanguageStore } from "@/stores/LanguageStore";
import { useProfileStore } from "@/stores/ProfileStore";
import { getThemeColorType } from "@/types/general";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const SplashScreen = () => {
  const { getThemeColor } = useBaseTheme();

  const changeAdvertisements = useAdvertisementStore(
    (state) => state.changeAdvertisements
  );
  const changeProfile = useProfileStore((state) => state.changeProfile);
  const changeLanguage = useLanguageStore((state) => state.changeLanguage);

  const [profileLoaded, setProfileLoaded] = useState<boolean>(false);
  const [unauth, setUnauth] = useState<boolean>(false);
  const [finish, setFinish] = useState<boolean>(false);

  let START_X =
    -AppConstants.WINDOW_WIDTH - AppConstants.SPLASH_SCREEN_IMAGE_WIDTH / 2;
  let MIDDLE_X =
    AppConstants.WINDOW_WIDTH / 2 - AppConstants.SPLASH_SCREEN_IMAGE_WIDTH / 2;
  let END_X =
    AppConstants.WINDOW_WIDTH + AppConstants.SPLASH_SCREEN_IMAGE_WIDTH / 2;

  const START_SCALE = 1;
  const MIDDLE_SCALE = 1.3;
  let translateValue = useSharedValue(START_X);
  let bounceValue = useSharedValue(START_SCALE);

  const animateStyles = useAnimatedStyle(() => {
    return {
      width: AppConstants.SPLASH_SCREEN_IMAGE_WIDTH,
      transform: [
        { translateX: translateValue.value },
        { scale: bounceValue.value },
      ],
    };
  });

  const startAnimation = () => {
    translateValue.value = withTiming(
      MIDDLE_X,
      { duration: 200 },
      (finished) => {
        if (finished)
          bounceValue.value = withSequence(
            withTiming(MIDDLE_SCALE, { duration: 600 }),
            withTiming(START_SCALE, { duration: 600 }, (finished) => {
              if (finished) {
                translateValue.value = withTiming(END_X, { duration: 200 });
              }
            })
          );
      }
    );
  };

  const [loaded, error] = useFonts({
    SpaceMonoBold: require("@/assets/fonts/SpaceMono-Bold.ttf"),
    SpaceMonoItalic: require("@/assets/fonts/SpaceMono-BoldItalic.ttf"),
    SpaceMonoBoldItalic: require("@/assets/fonts/SpaceMono-Italic.ttf"),
    SpaceMonoRegular: require("@/assets/fonts/SpaceMono-Regular.ttf"),

    OswaldBold: require("@/assets/fonts/Oswald-Bold.ttf"),
    OswaldExtraLight: require("@/assets/fonts/Oswald-ExtraLight.ttf"),
    OswaldLight: require("@/assets/fonts/Oswald-Light.ttf"),
    OswaldMedium: require("@/assets/fonts/Oswald-Medium.ttf"),
    OswaldRegular: require("@/assets/fonts/Oswald-Regular.ttf"),
    OswaldSemiBold: require("@/assets/fonts/Oswald-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  const fetchProfile = () => {
    customerService
      .profileApi()
      .then((response: any) => {
        changeProfile(response?.data);
        setProfileLoaded(true);
      })
      .catch((error) => {
        setUnauth(true);
      });
  };

  const fetchAdvertisements = () => {
    generalService
      .advertisementsApi()
      .then((response: any) => {
        changeAdvertisements(response.data);
      })
      .catch((error) => {});
  };
  const loadLanguage = () => {
    AsyncStorage.getItem("LANGUAGE")
      .then((storedLanguage) => {
        if (storedLanguage) {
          changeLanguage(storedLanguage);
        }
      })
      .catch((error) => {
        alert("loadLanguage Error: " + JSON.stringify(error, undefined, 2));
      });
  };

  useEffect(() => {
    startAnimation();
    loadLanguage();
    fetchAdvertisements();
    setTimeout(() => {
      fetchProfile();
    }, 2000);
  }, []);

  useEffect(() => {
    if ((profileLoaded || unauth) && loaded)
      router.replace({ pathname: "/tabs" });
  }, [unauth, profileLoaded, loaded]);

  useEffect(() => {
    if (translateValue.value >= MIDDLE_X) setFinish(true);
  }, [translateValue.value]);

  return (
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
      style={styles.container}
    >
      <Animated.View style={animateStyles}>
        <Image
          style={{
            width: AppConstants.SPLASH_SCREEN_IMAGE_WIDTH,
            height: AppConstants.SPLASH_SCREEN_IMAGE_HEIGHT,
          }}
          source={require("@/assets/screens/home.png")}
        />
      </Animated.View>
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

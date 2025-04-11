import AppConstants from "@/constants/AppConstants";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { HomeHeaderType } from "@/types/general";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import HomeSearchBar from "./HomeSearchBar";
import HomeWelcome from "./HomeWelcome";

const HomeHeaderWithImage = ({ scrollY }: HomeHeaderType) => {
  const { getThemeColor } = useBaseTheme();
  return (
    <LinearGradient
      colors={[getThemeColor("placeholder"), getThemeColor("background")]}
      start={[0, 1]}
      end={[1, 0]}
      locations={[0.5, 1.0]}
      style={styles.container}
    >
      <HomeWelcome textColor={getThemeColor("tint")} scrollY={scrollY} />
      <HomeSearchBar />
    </LinearGradient>
  );
};

export default HomeHeaderWithImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: AppConstants.HEADER_EXPANDED_HEIGHT,
    justifyContent: "center",
    paddingTop: AppConstants.TOP_OF_SCREEN,
  },
});

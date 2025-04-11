import HomeHeaderAnimation from "@/animations/HomeHeaderAnimation";
import EvtView from "@/components/EvtComponents/EvtView";
import AppConstants from "@/constants/AppConstants";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { HomeHeaderType } from "@/types/general";
import { StyleSheet } from "react-native";
import HomeSearchBar from "./HomeSearchBar";
import HomeWelcome from "./HomeWelcome";

const HomeHeaderNoImage = ({ scrollY }: HomeHeaderType) => {
  const { getThemeColor } = useBaseTheme();
  return (
    <HomeHeaderAnimation scrollY={scrollY}>
      <EvtView style={styles.container}>
        <HomeWelcome textColor={getThemeColor("text")} scrollY={scrollY} />
        <HomeSearchBar />
      </EvtView>
    </HomeHeaderAnimation>
  );
};

export default HomeHeaderNoImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: AppConstants.TOP_OF_SCREEN,
  },
});

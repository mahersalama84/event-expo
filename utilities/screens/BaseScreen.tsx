import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtView from "@/components/EvtComponents/EvtView";
import BackButton from "@/components/shared/BackButton";
import LargeLoading from "@/components/shared/LargeLoading";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { BaseScreenType } from "@/types/general";
import { StyleSheet } from "react-native";
import { Image } from "react-native-elements";

const BaseScreen = ({
  paddingTopOfScreen,
  topPart,
  image,
  header,
  headerText,
  actionIcon,
  handlePressAction,
  screenText,
  scrollY,
  children,
}: BaseScreenType) => {
  const { getThemeColor } = useBaseTheme();
  return (
    <EvtView
      style={[
        styles.container,
        paddingTopOfScreen ? { paddingTop: AppConstants.TOP_OF_SCREEN } : null,
      ]}
    >
      {topPart ?? topPart}
      {image && (
        <Image
          source={image}
          containerStyle={{
            aspectRatio: 1,
            width: "100%",
          }}
          PlaceholderContent={<LargeLoading />}
        />
      )}
      {header && (
        <BackButton
          scrollY={scrollY}
          color={getThemeColor("tint")}
          headerText={headerText}
          actionIcon={actionIcon ?? undefined}
          handlePressAction={handlePressAction ?? undefined}
        />
      )}
      <EvtView style={styles.main}>
        {screenText && (
          <EvtStyledText.ScreenTitle
            style={{ marginBottom: Sizes.margin.md / 2 }}
          >
            {screenText}
          </EvtStyledText.ScreenTitle>
        )}
        {children}
      </EvtView>
    </EvtView>
  );
};

export default BaseScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  main: {
    flex: 1,
    paddingHorizontal: Sizes.padding.md,
    marginTop: Sizes.margin.md,
  },
  headerText: {
    marginLeft: Sizes.margin.md,
  },
});

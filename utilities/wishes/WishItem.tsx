import EvtAvatar from "@/components/EvtComponents/EvtAvatar";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtView from "@/components/EvtComponents/EvtView";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { getThemeColorType } from "@/types/general";
import { WishProps } from "@/types/wish";
import { StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const WishItem = (props: WishProps) => {
  const { getThemeColor } = useBaseTheme();
  return (
    <Animated.View entering={FadeIn} style={styles(getThemeColor).container}>
      <EvtAvatar
        rounded
        title={props.item?.title}
        source={props.item.image ? { uri: props.item?.image } : undefined}
        background={props.item.image}
        size={Sizes.icon.size.lg}
        avatarContainerStyle={{ backgroundColor: "transparent" }}
      />
      <EvtView style={styles(getThemeColor).lisItemsContainer}>
        <EvtView style={styles(getThemeColor).lisItem}>
          <EvtStyledText.BodyBold>{props.item.title}</EvtStyledText.BodyBold>
        </EvtView>
        <EvtView style={styles(getThemeColor).lisItem}>
          <EvtStyledText.BodyBold>
            {props.item.pivot.note}
          </EvtStyledText.BodyBold>
        </EvtView>
      </EvtView>
    </Animated.View>
  );
};

export default WishItem;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: getThemeColor("onBackground"),
      padding: AppConstants.MEASURING_UNIT,
      borderRadius: Sizes.border.radius.md,
    },
    lisItemsContainer: {
      marginStart: AppConstants.MEASURING_UNIT,
    },
    lisItem: {
      backgroundColor: getThemeColor("onBackground"),
    },
  });

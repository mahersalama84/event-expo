import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import GetIcon from "@/components/icons/GetIcon";
import Spacer from "@/components/shared/Spacer";
import Sizes from "@/constants/Sizes";
import { ListHeaderType } from "@/types/general";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const ListHeader = (props: ListHeaderType) => {
  return (
    props.caption && (
      <Animated.View
        style={[
          props.captionContainerStyle,
          {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: Sizes.margin.md / 2,
          },
        ]}
      >
        {props.caption && props.captionSize == "small" && (
          <EvtStyledText.SubScreenTitle style={props.captionStyle}>
            {props.caption}
          </EvtStyledText.SubScreenTitle>
        )}
        {props.caption && props.captionSize == "large" && (
          <EvtStyledText.ScreenTitle style={props.captionStyle}>
            {props.caption}
          </EvtStyledText.ScreenTitle>
        )}
        {props.captionIcon && <Spacer flex />}
        {props.captionIcon && (
          <TouchableOpacity onPress={props.onPressCaptionIcon}>
            <GetIcon
              icon={props.captionIcon}
              variant={props.captionIconVariant}
              color={props.captionIconColor}
              size={props.captionIconSize}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
    )
  );
};

export default ListHeader;

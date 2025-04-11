import { AvatarType } from "@/types/general";
import GlobalFunctions from "@/utilities/GlobalFunctions";
import { Badge, Avatar as DefaultAvatar } from "react-native-elements";
import EvtView from "./EvtView";

const EvtAvatar = (props: AvatarType) => {
  const {
    background,
    badgeTop,
    badgeTopValue,
    badgeBottom,
    badgeSize,
    badgeStatus,
    avatarContainerStyle,
    ...otherProps
  } = props;
  return (
    <EvtView
      style={[
        {
          alignSelf: "center",
        },
        { ...avatarContainerStyle },
      ]}
    >
      <DefaultAvatar
        containerStyle={
          background
            ? {
                backgroundColor: GlobalFunctions.randomColor(background),
              }
            : null
        }
        {...otherProps}
      />

      {badgeTop && (
        <Badge
          status="primary"
          containerStyle={{ position: "absolute", top: 0, right: 0 }}
          badgeStyle={{ width: badgeSize, height: badgeSize, borderRadius: 50 }}
          value={badgeTopValue}
        />
      )}
      {badgeBottom && (
        <Badge
          status={badgeStatus ? "success" : "error"}
          containerStyle={{ position: "absolute", bottom: 0, right: 0 }}
          badgeStyle={{ width: badgeSize, height: badgeSize, borderRadius: 50 }}
        />
      )}
    </EvtView>
  );
};
export default EvtAvatar;

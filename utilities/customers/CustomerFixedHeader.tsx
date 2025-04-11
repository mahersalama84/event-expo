import EvtAvatar from "@/components/EvtComponents/EvtAvatar";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtView from "@/components/EvtComponents/EvtView";
import GetIcon from "@/components/icons/GetIcon";
import MediumLoading from "@/components/shared/MediumLoading";
import Spacer from "@/components/shared/Spacer";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { CustomerFixedHeaderType } from "@/types/customer";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const CustomerFixedHeader = (props: CustomerFixedHeaderType) => {
  const { getThemeColor } = useBaseTheme();
  return (
    <EvtView
      style={{
        flexDirection: "row",
        backgroundColor: getThemeColor("background"),
      }}
    >
      <EvtAvatar
        rounded
        title={
          props.customer?.image
            ? props.customer?.full_name
            : props.customer?.full_name?.charAt(0)
        }
        source={
          props.customer?.image ? { uri: props.customer?.image } : undefined
        }
        background={
          props.customer?.image ? undefined : props.customer?.full_name
        }
        size={Sizes.icon.size.xl}
        avatarContainerStyle={{ backgroundColor: "transparent" }}
      />
      <View style={{ justifyContent: "center" }}>
        <EvtView style={styles.header}>
          <EvtStyledText.SubScreenTitle numberOfLines={1} ellipsizeMode="tail">
            {props.customer?.full_name}
          </EvtStyledText.SubScreenTitle>
        </EvtView>
        <EvtView style={styles.header}>
          <EvtStyledText.Body>{props.customer?.mobile_no}</EvtStyledText.Body>
        </EvtView>
      </View>
      <Spacer flex />
      <View style={styles.actionsContainer}>
        {props.action1 && (
          <TouchableOpacity
            style={styles.actionItem}
            onPress={props.handlePressAction1}
          >
            {props.action1Loading ? (
              <MediumLoading color={props.actionColor} />
            ) : (
              <GetIcon
                icon={props.actionIcon1}
                variant={props.actionIcon1Variant}
                color={props.actionColor}
                size={Sizes.icon.size.md}
              />
            )}
          </TouchableOpacity>
        )}
        {props.action2 && (
          <TouchableOpacity
            style={styles.actionItem}
            onPress={props.handlePressAction2}
          >
            {props.action2Loading ? (
              <MediumLoading color={props.actionColor} />
            ) : (
              <GetIcon
                icon={props.actionIcon2}
                variant="Bulk"
                color={props.actionColor}
                size={Sizes.icon.size.md}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </EvtView>
  );
};
export default CustomerFixedHeader;

const styles = StyleSheet.create({
  header: {
    maxWidth: AppConstants.WINDOW_WIDTH - 200,
    marginLeft: Sizes.margin.md,
  },
  actionsContainer: { alignItems: "center", flexDirection: "row" },
  actionItem: {
    marginRight: Sizes.margin.md,
    backgroundColor: "tansparent",
  },
});

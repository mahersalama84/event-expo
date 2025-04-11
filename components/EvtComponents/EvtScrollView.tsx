import { useBaseTheme } from "@/context/BaseThemeContext";
import { ScrollViewType } from "@/types/general";
import {
  ScrollView as DefaultScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const EvtScrollView = (props: ScrollViewType) => {
  const { getThemeColor } = useBaseTheme();
  const { contentContainerStyle, ...otherProps } = props;
  const backgroundColor = getThemeColor("background");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, flexGrow: 1 }}
      keyboardVerticalOffset={30}
    >
      <DefaultScrollView
        contentContainerStyle={[{ backgroundColor }, contentContainerStyle]}
        {...otherProps}
      />
    </KeyboardAvoidingView>
  );
};

export default EvtScrollView;

import i18n from "@/assets/lang/i18n";
import AppConstants from "@/constants/AppConstants";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { LineOverTextType } from "@/types/general";
import EvtStyledText from "./EvtStyledText";
import EvtView from "./EvtView";

const EvtLineOverText = (props: LineOverTextType) => {
  const { getThemeColor } = useBaseTheme();
  return (
    <EvtView
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <EvtView
        style={{
          flex: 1,
          height: 1,
          backgroundColor: getThemeColor("text"),
        }}
      />
      <EvtStyledText.Body
        style={[
          {
            textAlign: "center",
            marginHorizontal: AppConstants.MEASURING_UNIT,
          },
        ]}
      >
        {i18n.t(`body.${props.text}`)}
      </EvtStyledText.Body>
      <EvtView
        style={{
          flex: 1,
          height: 1,
          backgroundColor: getThemeColor("text"),
        }}
      />
    </EvtView>
  );
};

export default EvtLineOverText;

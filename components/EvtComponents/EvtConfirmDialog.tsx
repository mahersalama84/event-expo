import DialogAnimation from "@/animations/DialogAnimation";
import i18n from "@/assets/lang/i18n";
import Spacer from "@/components/shared/Spacer";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { ConfirmDialogType } from "@/types/general";
import React from "react";
import { StyleSheet } from "react-native";
import EvtButton from "./EvtButton";
import EvtDevider from "./EvtDevider";
import EvtStyledText from "./EvtStyledText";
import EvtView from "./EvtView";

const EvtConfirmDialog = (props: ConfirmDialogType) => {
  const { getThemeColor } = useBaseTheme();

  return (
    <>
      {props.visible && (
        <DialogAnimation visible={props.visible}>
          <EvtStyledText.BodyBold
            textAlign="center"
            style={{ marginVertical: Sizes.margin.md * 2 }}
          >
            {props.message}
          </EvtStyledText.BodyBold>
          {props.subMessage && (
            <EvtStyledText.Body>{props.subMessage}</EvtStyledText.Body>
          )}
          <Spacer height={AppConstants.MEASURING_UNIT * 2} />
          <EvtDevider height={1} color={getThemeColor("placeholder")} />
          <Spacer height={AppConstants.MEASURING_UNIT} />
          <EvtView style={styles.buttonsContainer}>
            <EvtButton
              title={props.confirmButtonText || i18n.t("ok")}
              loading={props.confirming}
              disabled={props.confirming}
              buttonStyle={{
                width: AppConstants.CONFIRM_DIALOG_BUTTON_WIDTH,
                backgroundColor: props.confirmButtonColor,
              }}
              disabledStyle={{ backgroundColor: props.confirmButtonColor }}
              onPress={() => {
                props.setConfirming(true);
                props.confirmed();
              }}
            />
            <Spacer width={AppConstants.MEASURING_UNIT * 2} />
            <EvtButton
              title={props.cancelButtonText || i18n.t("forms.cancel")}
              type="outline"
              buttonStyle={{
                width: AppConstants.CONFIRM_DIALOG_BUTTON_WIDTH,
              }}
              onPress={props.closed}
            />
          </EvtView>
        </DialogAnimation>
      )}
    </>
  );
};

export default EvtConfirmDialog;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: AppConstants.MEASURING_UNIT,
  },
});

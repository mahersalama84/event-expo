import i18n from "@/assets/lang/i18n";
import EvtStyles from "@/assets/styles/EvtStyles";
import EvtButton from "@/components/EvtComponents/EvtButton";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtTextInput from "@/components/EvtComponents/EvtTextInput";
import { DateIcon, TextIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as occasionService from "@/services/occasion";
import { useMyOccasionsStore } from "@/stores/MyOccasionsStore";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { useToast } from "react-native-toast-notifications";
import DateFunctions from "../DateFunctions";
import BaseBottomSheet from "../sheets/BaseBottomSheet";

const OccasionFormModal = () => {
  const { getThemeColor, theme } = useBaseTheme();
  const toast = useToast();
  const { isOpen, closeBaseBottomSheet } = useBaseBottomSheet();
  const pushOccasion = useMyOccasionsStore((state) => state.pushOccasion);
  const editOccasion = useMyOccasionsStore((state) => state.editOccasion);
  const selectedOccasion = useMyOccasionsStore(
    (state) => state.selectedOccasion
  );

  useEffect(() => {
    if (selectedOccasion) {
      setTitle(selectedOccasion.title);
      setDescription(selectedOccasion.description);
      setStartDate(
        DateFunctions.formatDate(new Date(selectedOccasion.start_date))
      );
      setStartTime(
        DateFunctions.formatTimetoLacle(new Date(selectedOccasion.start_date))
      );
    }
  }, [selectedOccasion]);

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);

  const [startDate, setStartDate] = useState<string | undefined>(undefined);

  const [startTime, setStartTime] = useState<string | undefined>(undefined);

  const reset = () => {
    setShowStartDatePicker(false);
    setShowStartTimePicker(false);
    setTitle(undefined);
    setDescription(undefined);
    setStartDate(undefined);
    setStartTime(undefined);
  };
  const addOccasion = async () => {
    try {
      setLoading(true);
      const response: any = await occasionService.addOccasionApi(
        title,
        description,
        startDate,
        startTime
      );
      closeBaseBottomSheet();
      toast.show(response?.data?.message, { type: "success" });
      pushOccasion(response?.data.occasion);
      reset();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.show(error?.response?.data?.message, { type: "danger" });
    }
  };
  const updateOccasion = async () => {
    try {
      setLoading(true);
      let id = selectedOccasion?.id;
      const response: any = await occasionService.updateOccasionApi(
        id,
        title,
        description,
        startDate,
        startTime
      );
      closeBaseBottomSheet();
      toast.show(response?.data?.message, { type: "success" });
      editOccasion(response.data.occasion);
      reset();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.show(error?.response?.data?.message, { type: "danger" });
    }
  };

  const onSubmit = () => {
    if (selectedOccasion) updateOccasion();
    else addOccasion();
  };
  return (
    <BaseBottomSheet
      height={AppConstants.OCCASION_FORM_MODAL_HEIGHT}
      isOpen={isOpen}
      backdropOnPress={() => {
        closeBaseBottomSheet();
      }}
    >
      <EvtStyledText.SubScreenTitle style={{ marginBottom: Sizes.margin.md }}>
        {selectedOccasion
          ? i18n.t("occasions.editOccasion")
          : i18n.t("occasions.addOccasion")}
      </EvtStyledText.SubScreenTitle>

      <EvtTextInput
        shadow={true}
        placeholder={i18n.t("forms.title")}
        onChangeText={setTitle}
        value={title}
        prefixIcon={{ component: TextIcon }}
        maxLength={30}
      />
      <EvtTextInput
        shadow={true}
        multiline
        placeholder={i18n.t("forms.description")}
        onChangeText={setDescription}
        value={description}
        prefixIcon={{ component: TextIcon }}
        maxLength={30}
      />
      <EvtTextInput
        shadow={true}
        placeholder={i18n.t("forms.startDate")}
        onTouchStart={() => {
          setShowStartDatePicker((prev) => !prev);
        }}
        value={startDate}
        prefixIcon={{ component: DateIcon }}
        maxLength={30}
        showSoftInputOnFocus={false}
      />
      {showStartDatePicker && (
        <RNDateTimePicker
          style={{ flex: 1 }}
          themeVariant={theme ?? "light"}
          positiveButton={{
            label: i18n.t("forms.ok"),
            textColor: getThemeColor("tint"),
          }}
          negativeButton={{
            label: i18n.t("forms.cancel"),
            textColor: getThemeColor("tint"),
          }}
          mode="date"
          value={new Date()}
          display="spinner"
          minimumDate={new Date()}
          onChange={(obj) => {
            if (Platform.OS === "android") {
              setShowStartDatePicker(false);
            }
            if (obj.type === "set") {
              setStartDate(
                DateFunctions.formatDate(new Date(obj.nativeEvent.timestamp))
              );
            }
          }}
        />
      )}

      <EvtTextInput
        shadow={true}
        placeholder={i18n.t("forms.startTime")}
        onTouchStart={() => {
          setShowStartTimePicker((prev) => !prev);
        }}
        value={startTime}
        prefixIcon={{ component: DateIcon }}
        maxLength={30}
        showSoftInputOnFocus={false}
      />
      {showStartTimePicker && (
        <RNDateTimePicker
          style={{ flex: 1 }}
          themeVariant={theme ?? "light"}
          positiveButton={{
            label: i18n.t("forms.ok"),
            textColor: getThemeColor("tint"),
          }}
          negativeButton={{
            label: i18n.t("forms.cancel"),
            textColor: getThemeColor("tint"),
          }}
          mode="time"
          // timeZoneName="UTC"
          timeZoneName={DateFunctions.customerTimeZone()}
          is24Hour
          value={new Date()}
          display="spinner"
          minimumDate={new Date(1940, 0, 1)}
          onChange={(obj) => {
            if (Platform.OS === "android") {
              setShowStartTimePicker(false);
            }
            if (obj.type === "set") {
              setStartTime(
                DateFunctions.formatTime(new Date(obj.nativeEvent.timestamp))
              );
            }
          }}
        />
      )}
      <Animated.View
        entering={SlideInDown.springify().damping(15)}
        exiting={SlideOutDown.springify().damping(15)}
      >
        <EvtButton
          containerStyle={{ flex: 1, ...EvtStyles.components.button }}
          title={selectedOccasion ? i18n.t("forms.save") : i18n.t("forms.add")}
          loading={loading}
          disabled={loading || !title || !startDate || !startTime}
          iconPosition="right"
          onPress={onSubmit}
        />
      </Animated.View>
    </BaseBottomSheet>
  );
};

export default OccasionFormModal;

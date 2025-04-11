import i18n from "@/assets/lang/i18n";
import EvtStyles from "@/assets/styles/EvtStyles";
import EvtButton from "@/components/EvtComponents/EvtButton";
import EvtTextInput from "@/components/EvtComponents/EvtTextInput";
import { EmailIcon, TextIcon } from "@/components/icons/Icons";
import ProfileImagePicker from "@/components/shared/ProfileImagePicker";
import Spacer from "@/components/shared/Spacer";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as customerService from "@/services/customer";
import { useProfileStore } from "@/stores/ProfileStore";
import ProfileMobilePrefix from "@/utilities/profile/ProfileMobilePrefix";
import BaseScreen from "@/utilities/screens/BaseScreen";
import { router } from "expo-router";
import * as React from "react";
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";

const PersonalInfoScreen = () => {
  const { getThemeColor } = useBaseTheme();
  const toast = useToast();
  const profile = useProfileStore((state) => state.profile);
  const changeProfile = useProfileStore((state) => state.changeProfile);

  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [firstName, setFirstName] = useState<string | undefined>(undefined);
  const [lastName, setLastName] = useState<string | undefined>(undefined);

  const onChangeEmailText = (value: string) => {
    setEmail(value);
  };
  const onChangeFirstNameText = (value: string) => {
    setFirstName(value);
  };
  const onChangeLastNameText = (value: string) => {
    setLastName(value);
  };

  const onSubmit = () => {
    let first_name = firstName;
    let last_name = lastName;
    const updateProfile = async () => {
      try {
        setLoading(true);
        const response: any = await customerService.updateProfileApi(
          email,
          first_name,
          last_name
        );
        changeProfile(response?.data?.customer);
        toast.show(response?.data?.message, { type: "success" });
        // closeBaseBottomSheet();
        router.back();
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        toast.show(error?.response?.data?.message, { type: "danger" });
      }
    };
    updateProfile();
  };
  useEffect(() => {
    setMobile(profile?.mobile);
    setEmail(profile?.email);
    setFirstName(profile?.first_name);
    setLastName(profile?.last_name);
  }, []);

  return (
    <BaseScreen
      paddingTopOfScreen
      header
      screenText={i18n.t("headers.personalInfo")}
    >
      <Spacer height={AppConstants.MEASURING_UNIT * 5} />
      <ProfileImagePicker loading={loading} setLoading={setLoading} />
      <Spacer height={AppConstants.MEASURING_UNIT * 5} />
      <EvtTextInput
        shadow={true}
        reverse
        placeholder={i18n.t("forms.mobile")}
        value={mobile}
        prefixAddHoc={
          <ProfileMobilePrefix
            reverse
            color={getThemeColor("tint")}
            style={{ paddingHorizontal: Sizes.padding.md }}
          />
        }
        keyboardType="numeric"
        maxLength={9}
        editable={false}
      />
      <EvtTextInput
        shadow={true}
        placeholder={i18n.t("forms.email")}
        onChangeText={onChangeEmailText}
        value={email}
        prefixIcon={{ component: EmailIcon }}
        maxLength={30}
      />
      <EvtTextInput
        shadow={true}
        autoFocus
        placeholder={i18n.t("forms.firstName")}
        onChangeText={onChangeFirstNameText}
        value={firstName}
        prefixIcon={{ component: TextIcon }}
        maxLength={30}
      />

      <EvtTextInput
        shadow={true}
        placeholder={i18n.t("forms.lastName")}
        onChangeText={onChangeLastNameText}
        value={lastName}
        prefixIcon={{ component: TextIcon }}
        maxLength={30}
      />

      <Spacer flex />
      <EvtButton
        containerStyle={{ flex: 1, ...EvtStyles.components.button }}
        title={i18n.t("forms.save")}
        loading={loading}
        disabled={loading || !firstName || !lastName}
        iconPosition="right"
        onPress={onSubmit}
      />
    </BaseScreen>
  );
};

export default PersonalInfoScreen;

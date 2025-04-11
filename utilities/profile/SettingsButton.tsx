import ButtonHeaderAnimation from "@/animations/ButtonHeaderAnimation";
import GetIcon from "@/components/icons/GetIcon";
import { SettingsIcon } from "@/components/icons/Icons";
import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { SettingsButtonType } from "@/types/general";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

const SettingsButton = ({ scrollY }: SettingsButtonType) => {
  const { getThemeColor } = useBaseTheme();

  return (
    <ButtonHeaderAnimation scrollY={scrollY}>
      <TouchableOpacity
        onPress={() => router.push({ pathname: "/tabs/profile/settings" })}
      >
        <GetIcon
          variant="Bulk"
          icon={SettingsIcon}
          color={getThemeColor("tint")}
          size={Sizes.icon.size.md}
        />
      </TouchableOpacity>
    </ButtonHeaderAnimation>
  );
};
export default SettingsButton;

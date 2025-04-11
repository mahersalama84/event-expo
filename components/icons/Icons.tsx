import Sizes from "@/constants/Sizes";
import { useBaseTheme } from "@/context/BaseThemeContext";
import * as Iconsax from "iconsax-react-native";

export const DangerIcon = () => {
  const { getThemeColor } = useBaseTheme();
  return (
    <Iconsax.Danger
      size={Sizes.icon.size.xs}
      color={getThemeColor("buttonTitleColor")}
    />
  );
};

export const SuccessIcon = () => {
  const { getThemeColor } = useBaseTheme();
  return (
    <Iconsax.TickSquare
      size={Sizes.icon.size.xs}
      color={getThemeColor("buttonTitleColor")}
      style={[{ marginBottom: 0 }]}
    />
  );
};

export const HomeIcon = Iconsax.Home2;
export const CustomerIcon = Iconsax.Profile;
export const CustomersIcon = Iconsax.Profile2User;
export const OccasionsIcon = Iconsax.Cake;
export const WishesIcon = Iconsax.EmojiHappy;
export const SettingsIcon = Iconsax.Setting2;
export const AddIcon = Iconsax.Add;
export const AddSquareIcon = Iconsax.AddSquare;
export const MinusSquareIcon = Iconsax.MinusSquare;
export const NotFoundIcon = Iconsax.DirectboxNotif;
export const LoginIcon = Iconsax.LoginCurve;
export const LogoutIcon = Iconsax.LogoutCurve;
export const PhoneIcon = Iconsax.Call;
export const EmailIcon = Iconsax.Sms;
export const TextIcon = Iconsax.DocumentText1;
export const DrawerIcon = Iconsax.HambergerMenu;
export const ArrowUpIcon = Iconsax.ArrowUp;
export const ArrowRightIcon = Iconsax.ArrowRight;
export const ArrowLeftIcon = Iconsax.ArrowLeft;
export const BackArrowIcon = Iconsax.ArrowLeft2;
export const ArrowRight2Icon = Iconsax.ArrowRight2;
export const ArrowCircleUpIcon = Iconsax.ArrowCircleUp;
export const ArrowCircleDownIcon = Iconsax.ArrowCircleDown;
export const ArrowSquareRightIcon = Iconsax.ArrowSquareRight;
export const SearchIcon = Iconsax.SearchNormal1;
export const TickSquareIcon = Iconsax.TickSquare;
export const PersonalcardIcon = Iconsax.Personalcard;
export const LanguageIcon = Iconsax.Global;
export const DeleteAccountIcon = Iconsax.UserMinus;
export const ImageIcon = Iconsax.Image;
export const TrashIcon = Iconsax.Trash;
export const EditIcon = Iconsax.Edit;
export const LightModeIcon = Iconsax.Sun1;
export const DarkModeIcon = Iconsax.Moon;
export const MoreIcon = Iconsax.More;
export const EyeIcon = Iconsax.Eye;
export const EyeSlashIcon = Iconsax.EyeSlash;
export const NotificationIcon = Iconsax.Notification;
export const DateIcon = Iconsax.Calendar2;
export const RefreshIcon = Iconsax.ArrowRotateLeft;
export const HeartIcon = Iconsax.Heart;
export const HeartAddIcon = Iconsax.HeartAdd;
export const HeartRemoveIcon = Iconsax.HeartRemove;
export const HeartTickIcon = Iconsax.HeartTick;
export const HeartSlashIcon = Iconsax.HeartSlash;

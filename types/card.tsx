import * as Iconsax from "iconsax-react-native";
export type CardOptionType = {
  index?: number;
  loading?: boolean | undefined;
  noReverse?: boolean;
  key: string;
  textColor: string;
  title: string;
  icon: Iconsax.Icon;
  iconVariant?:
    | "Linear"
    | "Outline"
    | "Broken"
    | "Bold"
    | "Bulk"
    | "TwoTone"
    | undefined;
  pressed: () => void;
};

export type CardOptionTypeProps = {
  option: CardOptionType;
};

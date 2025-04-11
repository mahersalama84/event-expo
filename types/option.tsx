import * as Iconsax from "iconsax-react-native";
export type SelectOptionType = {
  index?: number;
  noReverse?: boolean;
  key: string;
  textColor: string;
  actionColor: string;
  title: string;
  value: string;
  checked: boolean;
  pressed: (value: string) => void;
};

export type SelectOptionTypeProps = {
  option: SelectOptionType;
};

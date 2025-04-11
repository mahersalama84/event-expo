import * as Iconsax from "iconsax-react-native";
export type ProfileType = {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  prefix: string;
  mobile: string;
  email: string;
  mobile_no: string;
  is_active: boolean;
  image: string | undefined;
  attendence_ids: string[];
  visible_wishes?: [];
  hidden_wishes?: [];
  followings_ids: string[];
  followers_ids: string[];
  followings_count: number;
  followers_count: number;
  accepted_followings_ids: string[];
  accepted_followers_ids: string[];
};

export type ProfileProps = {
  shadow?: boolean;
  item: ProfileType;
};

export type CustomerFixedHeaderType = {
  customer: ProfileType | undefined;
  actionColor?: string;
  action1?: boolean;
  action2?: boolean;
  action1Loading?: boolean;
  action2Loading?: boolean;
  actionIcon1?: Iconsax.Icon;
  actionIcon2?: Iconsax.Icon;
  actionIcon1Variant?:
    | "Linear"
    | "Outline"
    | "Broken"
    | "Bold"
    | "Bulk"
    | "TwoTone"
    | undefined;
  actionIcon2Variant?:
    | "Linear"
    | "Outline"
    | "Broken"
    | "Bold"
    | "Bulk"
    | "TwoTone"
    | undefined;
  handlePressAction1?: () => void;
  handlePressAction2?: () => void;
};

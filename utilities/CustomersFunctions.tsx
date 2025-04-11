import i18n from "@/assets/lang/i18n";
import {
  AddSquareIcon,
  HeartAddIcon,
  HeartRemoveIcon,
  HeartSlashIcon,
  HeartTickIcon,
  MinusSquareIcon,
} from "@/components/icons/Icons";
import { useProfileStore } from "@/stores/ProfileStore";

export default abstract class CustomersFunctions {
  static isFollower(customer_id: string) {
    const profile = useProfileStore((state) => state.profile);
    if (profile?.followers_ids?.includes(customer_id)) return true;
    else return false;
  }

  static isFollowing(customer_id: string) {
    const profile = useProfileStore((state) => state.profile);
    if (profile?.followings_ids?.includes(customer_id)) return true;
    else return false;
  }

  static AcceptedFollowingIconStatus(customer_id: string) {
    const profile = useProfileStore((state) => state.profile);
    if (profile?.accepted_followings_ids?.includes(customer_id))
      return HeartTickIcon;
    else return HeartSlashIcon;
  }

  static FollowerIconStatus(customer_id: string) {
    const profile = useProfileStore((state) => state.profile);
    if (profile?.accepted_followers_ids?.includes(customer_id))
      return HeartTickIcon;
    else return HeartSlashIcon;
  }

  static FollowerIcon(customer_id: string) {
    const profile = useProfileStore((state) => state.profile);
    if (profile?.accepted_followers_ids?.includes(customer_id))
      return HeartRemoveIcon;
    else return HeartAddIcon;
  }

  static FollowingIcon(customer_id: string) {
    const profile = useProfileStore((state) => state.profile);
    if (profile?.followings_ids?.includes(customer_id)) return MinusSquareIcon;
    else return AddSquareIcon;
  }

  static FollowerTitle(customer_id: string) {
    const profile = useProfileStore((state) => state.profile);
    if (profile?.accepted_followers_ids?.includes(customer_id))
      return i18n.t("friends.declineFollower");
    else return i18n.t("friends.acceptFollower");
  }

  static FollowingTitle(customer_id: string) {
    const profile = useProfileStore((state) => state.profile);
    if (profile?.followings_ids?.includes(customer_id))
      return i18n.t("friends.unfollow");
    else return i18n.t("friends.follow");
  }
}

import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtView from "@/components/EvtComponents/EvtView";
import GetIcon from "@/components/icons/GetIcon";
import {
  AddSquareIcon,
  EditIcon,
  MinusSquareIcon,
  TrashIcon,
} from "@/components/icons/Icons";
import MediumLoading from "@/components/shared/MediumLoading";
import Spacer from "@/components/shared/Spacer";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { useConfirmStore } from "@/stores/ConfirmStore";
import { useMyOccasionsStore } from "@/stores/MyOccasionsStore";
import { useMyWishesStore } from "@/stores/MyWishesStore";
import { useOtherOccasionsStore } from "@/stores/OtherOccasionsStore";
import { useProfileStore } from "@/stores/ProfileStore";
import { WishFixedHeaderType } from "@/types/wish";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BookWishModal from "./BookWishModal";
import UnBookWishModal from "./unBookWishModal";
import WishFormModal from "./WishFormModal";

const WishFixedHeader = (props: WishFixedHeaderType) => {
  const [foundCustomer, setFoundCustomer] = useState(-1);
  const [deleting, setDeleting] = useState(false);
  const { getThemeColor } = useBaseTheme();
  const myOccasion = useMyOccasionsStore((state) => state.selectedOccasion);
  const otherOccasion = useOtherOccasionsStore(
    (state) => state.selectedOccasion
  );
  const selectedOccasion = myOccasion?.id ? myOccasion : otherOccasion;
  const selectedWish = useMyWishesStore((state) => state.selectedWish);

  const profile = useProfileStore((state) => state.profile);
  const needConfirm = useConfirmStore((state) => state.needConfirm);

  const { openBaseBottomSheet } = useBaseBottomSheet();

  useEffect(() => {
    const found = selectedWish?.customers?.findIndex(
      (customer) => customer?.id == profile?.id
    );
    setFoundCustomer(found);
  }, [selectedWish]);
  let backgroundColor = props.backgroundColor;
  return (
    <EvtView
      style={{
        flexDirection: "row",
        backgroundColor,
      }}
    >
      <EvtView style={[styles.header, { backgroundColor }]}>
        <EvtStyledText.SubScreenTitle
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ backgroundColor }}
        >
          {selectedWish?.title}
        </EvtStyledText.SubScreenTitle>
      </EvtView>
      <Spacer flex backgroundColor={backgroundColor} />
      {selectedWish?.id && selectedOccasion?.customer_id != profile?.id && (
        <EvtView style={{ backgroundColor }}>
          {selectedWish && (
            <TouchableOpacity
              onPress={() => {
                foundCustomer >= 0
                  ? openBaseBottomSheet(<UnBookWishModal />)
                  : openBaseBottomSheet(<BookWishModal />);
              }}
            >
              <GetIcon
                variant="Bulk"
                icon={foundCustomer >= 0 ? MinusSquareIcon : AddSquareIcon}
                size={Sizes.icon.size.md}
                color={getThemeColor("tint")}
              />
            </TouchableOpacity>
          )}
        </EvtView>
      )}
      {selectedWish?.id && selectedOccasion?.customer_id == profile?.id && (
        <EvtView style={{ backgroundColor }}>
          {deleting ? (
            <MediumLoading />
          ) : (
            <TouchableOpacity
              onPress={() => needConfirm(selectedWish?.id)}
              style={{ bottom: 2 }}
            >
              <GetIcon
                variant="Bulk"
                icon={TrashIcon}
                size={Sizes.icon.size.md}
                color={getThemeColor("tint")}
              />
            </TouchableOpacity>
          )}
        </EvtView>
      )}

      {selectedWish?.id && selectedOccasion?.customer_id == profile?.id && (
        <EvtView style={{ backgroundColor }}>
          {
            <TouchableOpacity
              onPress={() => {
                openBaseBottomSheet(<WishFormModal />);
              }}
            >
              <GetIcon
                variant="Bulk"
                icon={EditIcon}
                size={Sizes.icon.size.md}
                color={getThemeColor("tint")}
              />
            </TouchableOpacity>
          }
        </EvtView>
      )}
    </EvtView>
  );
};

export default WishFixedHeader;

const styles = StyleSheet.create({
  header: {
    maxWidth: AppConstants.WINDOW_WIDTH - 200,
  },
});

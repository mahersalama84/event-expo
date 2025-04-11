import i18n from "@/assets/lang/i18n";
import EvtAvatar from "@/components/EvtComponents/EvtAvatar";
import EvtChip from "@/components/EvtComponents/EvtChip";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtView from "@/components/EvtComponents/EvtView";
import { EyeIcon, EyeSlashIcon, WishesIcon } from "@/components/icons/Icons";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import { useBaseTheme } from "@/context/BaseThemeContext";
import { useAttendesStore } from "@/stores/AttendeStore";
import { getThemeColorType } from "@/types/general";
import { StyleSheet } from "react-native";
import VerticalListGesture from "../lists/VerticalListGesture";
import BaseBottomSheet from "../sheets/BaseBottomSheet";
import WishItem from "../wishes/WishItem";

const ShowAttendeModal = () => {
  const { getThemeColor } = useBaseTheme();
  const { isOpen, closeBaseBottomSheet } = useBaseBottomSheet();

  const selectedAttende = useAttendesStore((state) => state.selectedAttende);
  const unSelectAttende = useAttendesStore((state) => state.unSelectAttende);

  const WishFixedHeader = (
    <EvtView
      style={{
        flexDirection: "row",
        backgroundColor: getThemeColor("background"),
      }}
    >
      <EvtAvatar
        rounded
        title={
          selectedAttende?.image
            ? selectedAttende?.full_name
            : selectedAttende?.full_name?.charAt(0)
        }
        source={
          selectedAttende?.image ? { uri: selectedAttende?.image } : undefined
        }
        background={
          selectedAttende?.image ? undefined : selectedAttende?.full_name
        }
        size={Sizes.icon.size.xl}
        avatarContainerStyle={{ backgroundColor: "transparent" }}
      />
      <EvtView style={{ justifyContent: "center" }}>
        <EvtStyledText.SubScreenTitle style={{ marginLeft: Sizes.margin.md }}>
          {selectedAttende?.full_name}
        </EvtStyledText.SubScreenTitle>
        <EvtStyledText.Body style={{ marginLeft: Sizes.margin.md }}>
          {selectedAttende?.mobile_no}
        </EvtStyledText.Body>
      </EvtView>
    </EvtView>
  );

  return (
    <BaseBottomSheet
      height={AppConstants.ATTENDE_MODAL_HEIGHT}
      isOpen={isOpen}
      backdropOnPress={() => {
        unSelectAttende();
        closeBaseBottomSheet();
      }}
    >
      {WishFixedHeader}
      <EvtView style={styles(getThemeColor).chipsContainer}>
        <EvtChip
          title={selectedAttende?.visible_wishes?.length ?? 0}
          style={styles(getThemeColor).chips}
          titleColor={getThemeColor("text")}
          iconColor={getThemeColor("tint")}
          icon={EyeIcon}
          iconSize={Sizes.icon.size.xs}
        />
        <EvtChip
          title={selectedAttende?.hidden_wishes?.length ?? 0}
          style={styles(getThemeColor).chips}
          titleColor={getThemeColor("text")}
          iconColor={getThemeColor("tint")}
          icon={EyeSlashIcon}
          iconSize={Sizes.icon.size.xs}
        />
      </EvtView>
      {selectedAttende?.visible_wishes && (
        <VerticalListGesture
          finish={true}
          numColumns={1}
          contentContainerStyle={styles(getThemeColor).bookedWishesContainer}
          datasource={selectedAttende?.visible_wishes}
          renderItem={({ item }) => <WishItem item={item} />}
          emptyIcon={WishesIcon}
          emptyText={i18n.t("app.notFound")}
          emptyTextDescription={i18n.t("wishes.notFoundWishes")}
        />
      )}
    </BaseBottomSheet>
  );
};

export default ShowAttendeModal;

const styles = (getThemeColor: getThemeColorType) =>
  StyleSheet.create({
    chipsContainer: {
      marginTop: Sizes.margin.md,
      flexDirection: "row",
      backgroundColor: getThemeColor("background"),
    },
    chips: {
      backgroundColor: getThemeColor("onBackground"),
      width: AppConstants.SMALL_CHIP_WIDTH,
      height: AppConstants.SMALL_CHIP_HEIGHT,
    },
    bookedWishesContainer: {
      backgroundColor: getThemeColor("background"),
      paddingVertical: Sizes.padding.md,
      paddingBottom: AppConstants.WINDOW_HEIGHT / 8,
    },
  });

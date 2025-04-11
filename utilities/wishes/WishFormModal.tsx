import i18n from "@/assets/lang/i18n";
import EvtStyles from "@/assets/styles/EvtStyles";
import EvtButton from "@/components/EvtComponents/EvtButton";
import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtTextInput from "@/components/EvtComponents/EvtTextInput";
import { TextIcon } from "@/components/icons/Icons";
import ImagePicker from "@/components/shared/ImagePicker";
import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";
import { useBaseBottomSheet } from "@/context/BaseBottomSheetContext";
import * as wishService from "@/services/wish";
import { useMyOccasionsStore } from "@/stores/MyOccasionsStore";
import { useMyWishesStore } from "@/stores/MyWishesStore";
import { useEffect, useState } from "react";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { useToast } from "react-native-toast-notifications";
import BaseBottomSheet from "../sheets/BaseBottomSheet";

const WishFormModal = () => {
  const toast = useToast();
  const pushWish = useMyWishesStore((state) => state.pushWish);
  const unSelectWish = useMyWishesStore((state) => state.unSelectWish);
  const selectWish = useMyWishesStore((state) => state.selectWish);
  const selectedWish = useMyWishesStore((state) => state.selectedWish);
  const editWish = useMyWishesStore((state) => state.editWish);
  const selectedOccasion = useMyOccasionsStore(
    (state) => state.selectedOccasion
  );
  const { isOpen, openBaseBottomSheet, closeBaseBottomSheet } =
    useBaseBottomSheet();
  const editOccasion = useMyOccasionsStore((state) => state.editOccasion);
  const selectOccasion = useMyOccasionsStore((state) => state.selectOccasion);
  useEffect(() => {
    if (selectedWish) {
      setImage(selectedWish.image);
      setTitle(selectedWish.title);
      setDescription(selectedWish.description);
    }
  }, [selectedWish]);

  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string>("");

  const resetData = () => {
    setImage(undefined);
    setTitle(undefined);
    setDescription("");
  };
  const uploadImage = async (file) => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("id", selectedWish?.id);
      formData.append("image", file);
      const response: any = await wishService.uploadImageApi(formData);
      toast.show(response?.data?.message, { type: "success" });
      editWish(response?.data?.wish);
      setImage(response?.data?.wish?.image);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.show(error?.response?.data?.message, { type: "danger" });
    }
  };
  const addWish = async () => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("occasion_id", selectedOccasion?.id);
      formData.append("image", image);
      formData.append("title", title);
      formData.append("description", description);
      const response: any = await wishService.addWishApi(formData);
      closeBaseBottomSheet();
      toast.show(response?.data?.message, { type: "success" });
      editOccasion(response.data.occasion);
      selectOccasion(response.data.occasion);
      pushWish(response.data.wish);
      // selectWish(response.data.wish);
      unSelectWish();
      resetData();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.show(error?.response?.data?.message, { type: "danger" });
    }
  };
  const updateWish = async () => {
    try {
      setLoading(true);
      let id = selectedWish?.id;
      let occasion_id = selectedOccasion?.id;
      const response: any = await wishService.updateWishApi(
        id,
        occasion_id,
        title,
        description
      );
      toast.show(response?.data?.message, { type: "success" });
      editWish(response?.data?.wish);
      selectWish(response?.data?.wish);
      closeBaseBottomSheet();
      resetData();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.show(error?.response?.data?.message, { type: "danger" });
    }
  };

  const onSubmit = () => {
    if (selectedWish) updateWish();
    else addWish();
  };
  return (
    <BaseBottomSheet
      height={AppConstants.WISH_FORM_MODAL_HEIGHT}
      isOpen={isOpen}
      backdropOnPress={() => {
        closeBaseBottomSheet();
      }}
    >
      <ImagePicker
        edit={selectedWish ? true : false}
        image={image}
        setImage={selectedWish ? uploadImage : setImage}
      />
      <EvtStyledText.SubScreenTitle style={{ marginBottom: Sizes.margin.md }}>
        {selectedWish ? i18n.t("wishes.editWish") : i18n.t("wishes.addWish")}
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
      <Animated.View
        entering={SlideInDown.springify().damping(15)}
        exiting={SlideOutDown.springify().damping(15)}
      >
        <EvtButton
          containerStyle={{ flex: 1, ...EvtStyles.components.button }}
          title={selectedWish ? i18n.t("forms.save") : i18n.t("forms.add")}
          loading={loading}
          disabled={loading || !title || !image}
          iconPosition="right"
          onPress={onSubmit}
        />
      </Animated.View>
    </BaseBottomSheet>
  );
};

export default WishFormModal;

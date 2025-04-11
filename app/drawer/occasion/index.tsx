import EvtView from "@/components/EvtComponents/EvtView";
import AppConstants from "@/constants/AppConstants";
import { useMyOccasionsStore } from "@/stores/MyOccasionsStore";
import { useOtherOccasionsStore } from "@/stores/OtherOccasionsStore";
import { OccasionCard } from "@/utilities/occasions/OccasionCard";

const OccasionDrawerScreen = () => {
  const myOccasion = useMyOccasionsStore((state) => state.selectedOccasion);
  const otherOccasion = useOtherOccasionsStore(
    (state) => state.selectedOccasion
  );

  const selectedOccasion = myOccasion?.id ? myOccasion : otherOccasion;

  return (
    <EvtView style={{ flexGrow: 1, margin: AppConstants.MEASURING_UNIT }}>
      <OccasionCard occasion={selectedOccasion} />
    </EvtView>
  );
};

export default OccasionDrawerScreen;

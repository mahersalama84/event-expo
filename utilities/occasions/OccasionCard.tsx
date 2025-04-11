import EvtStyledText from "@/components/EvtComponents/EvtStyledText";
import EvtView from "@/components/EvtComponents/EvtView";
import CountDownOccasion from "@/components/shared/CountDownOccasion";
import Spacer from "@/components/shared/Spacer";
import AppConstants from "@/constants/AppConstants";
import { OccasionType } from "@/types/occasion";
import DateFunctions from "../DateFunctions";

type OccasionCardProps = {
  occasion: OccasionType | undefined;
};
export const OccasionCard = (props: OccasionCardProps) => {
  return (
    <>
      <EvtStyledText.Body>{props?.occasion?.description}</EvtStyledText.Body>
      <Spacer height={AppConstants.MEASURING_UNIT} />
      <EvtView>
        <EvtStyledText.Body>
          {DateFunctions.formatDate(new Date(props?.occasion?.start_date))}
        </EvtStyledText.Body>
      </EvtView>
      <Spacer height={AppConstants.MEASURING_UNIT} />
      <EvtView>
        <EvtStyledText.Body>
          {DateFunctions.formatTimetoLacle(
            new Date(props?.occasion?.start_date)
          )}
        </EvtStyledText.Body>
      </EvtView>
      <CountDownOccasion occasionDate={props?.occasion?.start_date} />
    </>
  );
};

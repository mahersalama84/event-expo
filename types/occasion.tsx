import { ProfileType } from "./customer";

export type OccasionType = {
  id: string;
  title: string;
  description: string;
  start_date: string;
  wishes_count: string;
  attendence_ids: string[];
  attendence_count: number;
  customer: ProfileType | undefined;
  customer_id: string | undefined;
  updated_at: string;
};
export type OccasionProps = {
  shadow?: boolean;
  item: OccasionType;
};

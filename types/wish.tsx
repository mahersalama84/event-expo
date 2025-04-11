// import { OccasionType } from "./occasion";

export type WishType = {
  id: string;
  occasion_id: string;
  title: string;
  description: string;
  image: string;
};
export type WishProps = {
  item: WishType;
};

export type WishFixedHeaderType = {
  backgroundColor: string;
};

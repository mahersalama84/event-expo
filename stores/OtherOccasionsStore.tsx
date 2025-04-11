import { OccasionType } from "@/types/occasion";
import { create } from "zustand";

type OtherOccasionStore = {
  selectedOccasion: OccasionType | undefined;
  selectOccasion: (occasion: OccasionType) => void;
  unSelectOccasion: () => void;

  storedOccasions: OccasionType[];
  storeOccasions: (storedOccasions: OccasionType[]) => void;
  clearOccasions: () => void;
  pushAttendOccasionId: (customer_id: string) => void;
  popAttendOccasionId: (customer_id: string) => void;
};

export const useOtherOccasionsStore = create<OtherOccasionStore>((set) => ({
  selectedOccasion: undefined,
  selectOccasion: (occasion) => set({ selectedOccasion: occasion }),
  unSelectOccasion: () => set({ selectedOccasion: undefined }),

  storedOccasions: [],
  storeOccasions: (storedOccasions) =>
    set({ storedOccasions: storedOccasions }),
  clearOccasions: () => set({ storedOccasions: [] }),

  pushAttendOccasionId: (customer_id: string) =>
    set((state) => ({
      selectedOccasion: state.selectedOccasion
        ? {
            ...state.selectedOccasion,
            attendence_ids: [
              customer_id,
              ...state.selectedOccasion.attendence_ids,
            ],
          }
        : undefined,
      storedOccasions: state.storedOccasions.map((e) =>
        e.id === state.selectedOccasion?.id
          ? {
              ...state.selectedOccasion,
              attendence_ids: [
                customer_id,
                ...state.selectedOccasion.attendence_ids,
              ],
            }
          : e
      ),
    })),

  popAttendOccasionId: (customer_id: string) =>
    set((state) => ({
      selectedOccasion: state.selectedOccasion
        ? {
            ...state.selectedOccasion,
            attendence_ids: state.selectedOccasion.attendence_ids.filter(
              (id) => id != customer_id
            ),
          }
        : undefined,
      storedOccasions: state.storedOccasions.map((e) =>
        e.id === state.selectedOccasion?.id
          ? {
              ...state.selectedOccasion,
              attendence_ids: state.selectedOccasion.attendence_ids.filter(
                (id) => id != customer_id
              ),
            }
          : e
      ),
    })),
}));

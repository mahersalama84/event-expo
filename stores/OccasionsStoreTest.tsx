import { OccasionType } from "@/types/occasion";
import { create } from "zustand";

type OccasionStore = {
  storedOccasions: OccasionType[];
  selectedOccasion: OccasionType | undefined;
  storeOccasions: (storedOccasions: OccasionType[]) => void;
  clearOccasions: () => void;
  pushOccasion: (occasion: OccasionType) => void;
  popOccasion: (id: string) => void;
  editOccasion: (occasion: OccasionType) => void;
  incrementWishes: (occasion: OccasionType) => void;

  selectOccasion: (occasion: OccasionType) => void;
  unSelectOccasion: () => void;

  pushAttendOccasionId: (customer_id: string) => void;
  popAttendOccasionId: (customer_id: string) => void;
  // attendIds: Map<string, string[]>;
  // pushAttendProfileIds: (category_id: string, attendence_ids: string[]) => void;
  // popAttendProfileIds: (category_id: string) => void;
};

export const useOccasionsStore = create<OccasionStore>((set) => ({
  storedOccasions: [],
  selectedOccasion: undefined,
  storeOccasions: (storedOccasions) =>
    set({ storedOccasions: storedOccasions }),
  clearOccasions: () => set({ storedOccasions: [] }),
  pushOccasion: (occasion) =>
    set((state) => ({ storedOccasions: [occasion, ...state.storedOccasions] })),
  popOccasion: (id) =>
    set((state) => ({
      storedOccasions: state.storedOccasions.filter((e) => e.id != id),
    })),
  editOccasion: (occasion) =>
    set((state) => ({
      storedOccasions: state.storedOccasions.map((e) =>
        e.id === occasion.id ? { ...occasion } : e
      ),
    })),
  incrementWishes: (occasion) =>
    set((state) => ({
      storedOccasions: state.storedOccasions.map((e) =>
        e.id === occasion.id
          ? { ...occasion, wishes_count: occasion.wishes_count + 1 }
          : e
      ),
    })),

  selectOccasion: (occasion) => set({ selectedOccasion: occasion }),
  unSelectOccasion: () => set({ selectedOccasion: undefined }),

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
    })),
  // attendIds: new Map<string, string[]>(),
  // pushAttendProfileIds: (category_id, attendence_ids) =>
  //   set((state) => ({
  //     attendIds: new Map(state.attendIds).set(category_id, attendence_ids),
  //   })),
  // popAttendProfileIds: (category_id) =>
  //   set((state) => ({
  //     attendIds: new Map(state.attendIds).delete(category_id)
  //       ? new Map(state.attendIds)
  //       : new Map(state.attendIds),
  //   })),
}));

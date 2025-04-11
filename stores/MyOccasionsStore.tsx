import { OccasionType } from "@/types/occasion";
import { create } from "zustand";

type MyOccasionStore = {
  selectedOccasion: OccasionType | undefined;
  selectOccasion: (occasion: OccasionType) => void;
  unSelectOccasion: () => void;

  storedOccasions: OccasionType[];
  storeOccasions: (storedOccasions: OccasionType[]) => void;
  clearOccasions: () => void;
  pushOccasion: (occasion: OccasionType) => void;
  popOccasion: (id: string | undefined) => void;
  editOccasion: (occasion: OccasionType) => void;
};

export const useMyOccasionsStore = create<MyOccasionStore>((set) => ({
  selectedOccasion: undefined,
  selectOccasion: (occasion) => set({ selectedOccasion: occasion }),
  unSelectOccasion: () => set({ selectedOccasion: undefined }),

  storedOccasions: [],
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
}));

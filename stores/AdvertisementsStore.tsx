import { create } from "zustand";

type AdvertisementStore = {
  advertisements: string[] | undefined;
  changeAdvertisements: (value: string[]) => void;
  clearAdvertisements: () => void;
};

export const useAdvertisementStore = create<AdvertisementStore>((set) => ({
  advertisements: undefined,
  changeAdvertisements: (value) => set({ advertisements: value }),
  clearAdvertisements: () => set({ advertisements: undefined }),
}));

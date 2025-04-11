import { create } from "zustand";
type MobilePrefixStore = {
  mobilePrefix: string | undefined;
  clearMobilePrefix: () => void;
  setMobilePrefix: (value: string) => void;
};

export const useMobilePrefixStore = create<MobilePrefixStore>((set) => ({
  mobilePrefix: "971",
  clearMobilePrefix: () => set({ mobilePrefix: undefined }),
  setMobilePrefix: (value: string) => set({ mobilePrefix: value }),
}));

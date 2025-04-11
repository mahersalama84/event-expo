import { create } from "zustand";
type ConfirmStore = {
  which: string | undefined;
  clearConfirm: () => void;
  needConfirm: (value: string) => void;
};

export const useConfirmStore = create<ConfirmStore>((set) => ({
  which: undefined,
  clearConfirm: () => set({ which: undefined }),
  needConfirm: (value: string) => set({ which: value }),
}));

import { ProfileType } from "@/types/customer";
import { create } from "zustand";

type AttendeStore = {
  selectedAttende: ProfileType | undefined;
  selectAttende: (attende: ProfileType) => void;
  unSelectAttende: () => void;
};

export const useAttendesStore = create<AttendeStore>((set) => ({
  selectedAttende: undefined,
  selectAttende: (attende) => set({ selectedAttende: attende }),
  unSelectAttende: () => set({ selectedAttende: undefined }),
}));

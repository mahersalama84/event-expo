import { ProfileType } from "@/types/customer";
import { create } from "zustand";

type FollowerStore = {
  selectedFollower: ProfileType | undefined;
  selectFollower: (friend: ProfileType) => void;
  unSelectFollower: () => void;
};

export const useFollowersStore = create<FollowerStore>((set) => ({
  selectedFollower: undefined,
  selectFollower: (friend) => set({ selectedFollower: friend }),
  unSelectFollower: () => set({ selectedFollower: undefined }),
}));

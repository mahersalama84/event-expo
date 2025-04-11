import { ProfileType } from "@/types/customer";
import { create } from "zustand";

type FollowingStore = {
  selectedFollowing: ProfileType | undefined;
  selectFollowing: (friend: ProfileType) => void;
  unSelectFollowing: () => void;
};

export const useFollowingsStore = create<FollowingStore>((set) => ({
  selectedFollowing: undefined,
  selectFollowing: (friend) => set({ selectedFollowing: friend }),
  unSelectFollowing: () => set({ selectedFollowing: undefined }),
}));

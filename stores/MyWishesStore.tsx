import { WishType } from "@/types/wish";
import { create } from "zustand";

type MyWishStore = {
  selectedWish: WishType | undefined;
  selectWish: (wish: WishType) => void;
  unSelectWish: () => void;

  storedWishes: WishType[];
  storeWishes: (storedWishes: WishType[]) => void;
  clearWishes: () => void;
  pushWish: (wish: WishType) => void;
  popWish: (id: string | undefined) => void;
  editWish: (wish: WishType) => void;
};

export const useMyWishesStore = create<MyWishStore>((set) => ({
  selectedWish: undefined,
  selectWish: (wish) => set({ selectedWish: wish }),
  unSelectWish: () => set({ selectedWish: undefined }),

  storedWishes: [],
  storeWishes: (storedWishes) => set({ storedWishes: storedWishes }),
  clearWishes: () => set({ storedWishes: [] }),
  pushWish: (wish) =>
    set((state) => ({ storedWishes: [wish, ...state.storedWishes] })),
  popWish: (id) =>
    set((state) => ({
      storedWishes: state.storedWishes.filter((e) => e.id != id),
    })),
  editWish: (wish) => {
    set((state) => ({
      storedWishes: state.storedWishes.map((e) =>
        e.id === wish.id ? { ...wish } : e
      ),
    }));
  },
}));

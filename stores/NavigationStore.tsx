import { create } from "zustand";
type NavigationStore = {
  nav: string | undefined;
  clearNav: () => void;
  changeNav: (value: string) => void;
};

export const useNavigationStore = create<NavigationStore>((set) => ({
  nav: undefined,
  clearNav: () => set({ nav: undefined }),
  changeNav: (value: string) => set({ nav: value }),
}));

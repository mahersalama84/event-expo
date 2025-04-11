import { ProfileType } from "@/types/customer";
import { create } from "zustand";

type CustomerStore = {
  selectedCustomer: ProfileType | undefined;
  selectCustomer: (friend: ProfileType) => void;
  unSelectCustomer: () => void;
};

export const useCustomersStore = create<CustomerStore>((set) => ({
  selectedCustomer: undefined,
  selectCustomer: (friend) => set({ selectedCustomer: friend }),
  unSelectCustomer: () => set({ selectedCustomer: undefined }),
}));

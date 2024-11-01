import { Product } from "@/graphql/types";
import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export type User = {
  id: string;
  email: string;
};

export interface UserState {
  userData: User | null;
  setUser: (param: any) => void;
}

type UserPersist = (
  config: StateCreator<UserState>,
  options: PersistOptions<UserState>
) => StateCreator<UserState>;

export const useUserStore = create<UserState>((set) => ({
  userData: null,
  setUser: (value: any) => set(() => ({ userData: value })),
}));

interface cartState {
  items: Product[];
  addItem: (item: Product) => void;
  deleteItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
}

export const useCartStore = create<cartState>()((set) => ({
  items: [],
  addItem: (item: Product) =>
    set(({ items }) => {
      const existingItem = items.find((product) => product.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        items.push({ ...item, quantity: item.quantity ?? 1 });
      }
      return { items };
    }),
  deleteItem: (id: string) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  increaseQuantity: (id: string) =>
    set((state) => {
      const itemToIncrease = state.items.find((item) => item.id === id);
      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
      }
      return {};
    }),
  decreaseQuantity: (id: string) =>
    set((state) => {
      const itemToDecrease = state.items.find((item) => item.id === id);
      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity -= 1;
      }
      return {};
    }),
}));

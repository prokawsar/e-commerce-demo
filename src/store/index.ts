import { Product } from "@/graphql/types";
import { toast } from "sonner";
import { create } from "zustand";

export type User = {
  id: string;
  email: string;
  access_token: string;
};

export interface UserState {
  userData: User | null;
  setUser: (param: any) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userData: null,
  setUser: (value: any) => set(() => ({ userData: value })),
}));

interface AuthModalState {
  isOpen: boolean;
  pendingAction: (() => void) | null;
  openModal: (action: () => void) => void;
  closeModal: () => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  isOpen: false,
  pendingAction: null,
  openModal: (action) => set({ isOpen: true, pendingAction: action }),
  closeModal: () => set({ isOpen: false, pendingAction: null }),
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
  addItem: (item: Product) => {
    set(({ items }) => {
      const existingItem = items.find((product) => product.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        items.push({ ...item, quantity: item.quantity ?? 1 });
      }
      return { items };
    });
    toast.info("Item added into cart");
  },
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

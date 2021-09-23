import { Mobile } from '@/types/mobile';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItemType extends Mobile {
  qty: number;
}

interface CartStore {
  cartItems: CartItemType[];
  addToCart: (mobile: Mobile, qty: number) => void;
  getTotalPrice: () => number;
  getTotalQty: () => number;
  isCartEmpty: () => boolean;
  removeItem: (mobileId: string) => void;
  changeItemQty: (mobileId: string, qty: number) => void;
}

const useCartStore = create<CartStore>(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (mobile, qty) => {
        const itemIdx = get().cartItems.findIndex((i) => i.id === mobile.id);
        if (itemIdx !== -1) {
          get().changeItemQty(mobile.id, qty);
        } else {
          return set({
            cartItems: [...get().cartItems, { ...mobile, qty }],
          });
        }
      },
      getTotalPrice: () =>
        get().cartItems.reduce((prev, curr) => prev + curr.qty * curr.price, 0),
      getTotalQty: () =>
        get().cartItems.reduce((prev, curr) => prev + curr.qty, 0),
      isCartEmpty: () => get().cartItems.length === 0,
      removeItem: (mobileId) => {
        const { cartItems } = get();
        const newItems = cartItems.filter((i) => i.id !== mobileId);
        return set({ cartItems: newItems });
      },
      changeItemQty: (mobileId, qty) => {
        if (qty === 0) {
          get().removeItem(mobileId);
        } else {
          const itemIdx = get().cartItems.findIndex((i) => i.id === mobileId);
          const newItems = get().cartItems.filter((i) => i.id !== mobileId);
          newItems.splice(itemIdx, 0, {
            ...get().cartItems[itemIdx],
            qty,
          });
          return set({ cartItems: newItems });
        }
      },
    }),
    { name: 'cart_data' }
  )
);

export const hydrateStore = (initialState) => {
  if (initialState) {
    useCartStore.setState(initialState);
  }
};

export default useCartStore;

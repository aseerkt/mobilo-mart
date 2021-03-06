import { Mobile } from '@/types/mobile';
import { OrderItem } from '../types/order';
import { StoreSlice } from '../types/store';

export type CartItemType = Omit<OrderItem, 'status' | 'createdAt' | 'id'>;

export interface CartSlice {
  cartItems: CartItemType[];
  getTotalPrice: () => number;
  getTotalQty: () => number;
  isCartEmpty: () => boolean;
  itemCount: () => number;
  addToCart: (mobile: Mobile, qty: number) => void;
  removeItem: (mobileId: string) => void;
  changeItemQty: (mobileId: string, qty: number) => void;
  clearCart: () => void;
}

const cartSlice: StoreSlice<CartSlice> = (set, get) => ({
  cartItems: [],
  itemCount: () => get().cartItems.length || 0,
  addToCart: (mobile, qty) => {
    const itemIdx = get().cartItems.findIndex((i) => i.mobile.id === mobile.id);
    if (itemIdx !== -1) {
      get().changeItemQty(mobile.id, qty);
    } else {
      return set({
        cartItems: [...get().cartItems, { mobile, qty }],
      });
    }
  },
  getTotalPrice: () =>
    get().cartItems.reduce(
      (prev, curr) => prev + curr.qty * curr.mobile.price,
      0
    ),
  getTotalQty: () => get().cartItems.reduce((prev, curr) => prev + curr.qty, 0),
  isCartEmpty: () => get().cartItems.length === 0,
  removeItem: (mobileId) => {
    const { cartItems } = get();
    const newItems = cartItems.filter((i) => i.mobile.id !== mobileId);
    return set({ cartItems: newItems });
  },
  changeItemQty: (mobileId, qty) => {
    if (qty === 0) {
      get().removeItem(mobileId);
    } else {
      const itemIdx = get().cartItems.findIndex(
        (i) => i.mobile.id === mobileId
      );
      const newItems = get().cartItems.filter((i) => i.mobile.id !== mobileId);
      newItems.splice(itemIdx, 0, {
        ...get().cartItems[itemIdx],
        qty,
      });
      return set({ cartItems: newItems });
    }
  },
  clearCart: () => set({ cartItems: [] }),
});

export default cartSlice;

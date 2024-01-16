import { IMobile } from '@/types/mobile';
import { OrderItem } from '../types/order';
import { StoreSlice } from '../types/store';

export type CartItemType = Omit<OrderItem, 'status' | 'createdAt' | 'id'>;
export type CartState = {
  cartItems: CartItemType[];
};

export interface CartSlice extends CartState {
  addToCart: (mobile: IMobile, qty: number) => void;
  removeItem: (mobileId: string) => void;
  changeItemQty: (mobileId: string, qty: number) => void;
  clearCart: () => void;
}

export const cartInitialState: CartState = {
  cartItems: [],
};

const cartSlice: StoreSlice<CartSlice> = (set, get) => ({
  ...cartInitialState,
  itemCount: () => get().cartItems.length || 0,
  addToCart: (mobile, qty) => {
    const itemIdx = get().cartItems.findIndex(
      (i) => i.product._id === mobile._id
    );
    if (itemIdx !== -1) {
      get().changeItemQty(mobile._id, qty);
    } else {
      return set({
        cartItems: [...get().cartItems, { product: mobile, qty }],
      });
    }
  },
  getTotalPrice: () =>
    get().cartItems.reduce(
      (prev, curr) => prev + curr.qty * curr.product.price,
      0
    ),
  getTotalQty: () => get().cartItems.reduce((prev, curr) => prev + curr.qty, 0),
  isCartEmpty: () => get().cartItems.length === 0,
  removeItem: (mobileId) => {
    const { cartItems } = get();
    const newItems = cartItems.filter((i) => i.product._id !== mobileId);
    return set({ cartItems: newItems });
  },
  changeItemQty: (mobileId, qty) => {
    if (qty === 0) {
      get().removeItem(mobileId);
    } else {
      const itemIdx = get().cartItems.findIndex(
        (i) => i.product._id === mobileId
      );
      const newItems = get().cartItems.filter(
        (i) => i.product._id !== mobileId
      );
      newItems.splice(itemIdx, 0, {
        ...get().cartItems[itemIdx],
        qty,
      });
      return set({ cartItems: newItems });
    }
  },
  clearCart: () => set({ cartItems: [] }),
});

export const cartSelectors = {
  itemCountSelector: (state: CartSlice) => state.cartItems.length,
  totalPriceSelector: (state: CartSlice) =>
    state.cartItems.reduce(
      (prev, curr) => prev + curr.qty * curr.product.price,
      0
    ),
  totalQtySelector: (state: CartSlice) =>
    state.cartItems.reduce((prev, curr) => prev + curr.qty, 0),
  isCartEmptySelector: (state: CartSlice) => state.cartItems.length === 0,
};

export default cartSlice;

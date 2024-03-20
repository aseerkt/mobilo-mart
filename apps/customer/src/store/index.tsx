import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import addressSlice, {
  AddressSlice,
  addressInitialState,
} from './addressStore';
import cartSlice, { CartSlice, cartInitialState } from './cartStore';

export type GlobalSlice = CartSlice & AddressSlice;

const usePersistedStore = create(
  persist<GlobalSlice>(
    (set, get) => ({
      ...cartSlice(set, get),
      ...addressSlice(set, get),
    }),
    { name: 'mobilo_cart_address_data' }
  )
);

const initialState = {
  ...cartInitialState,
  ...addressInitialState,
};

type Selector<U> = (state: GlobalSlice) => U;

export const useStore = <T,>(selector: Selector<T>) => {
  const selectedState = usePersistedStore(selector);

  return typeof window === 'undefined'
    ? selector(initialState as GlobalSlice)
    : selectedState;
};

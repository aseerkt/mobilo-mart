import { useLayoutEffect } from 'react';
import createContext from 'zustand/context';
import create from 'zustand';
import cartSlice, { CartSlice } from './cartStore';
import addressSlice, { AddressSlice } from './addressStore';
import { persist } from 'zustand/middleware';

// https://github.com/vercel/next.js/blob/master/examples/with-zustand/lib/store.js
// https://github.com/pmndrs/zustand/issues/508#issue-951331506

export type GlobalSlice = CartSlice & AddressSlice;

let store;

const ZusContext = createContext<GlobalSlice>();

export const Provider = ZusContext.Provider;
export const useStore = ZusContext.useStore;

export const initializeStore = (preloadedState = {}) => {
  return create<GlobalSlice>(
    persist(
      (set, get) => ({
        ...preloadedState,
        ...cartSlice(set, get),
        ...addressSlice(set, get),
      }),
      { name: 'mobilo_cart_address_data' }
    )
  );
};

export function useHydrate(initialState) {
  // For SSR & SSG, always use a new store.
  if (typeof window === 'undefined') {
    return () => initializeStore(initialState);
  }

  // For CSR, always re-use same store.
  store = store ?? initializeStore(initialState);
  // And if initialState changes, then merge states in the next render cycle.
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    if (initialState && store) {
      store.setState({
        ...store.getState(),
        ...initialState,
      });
    }
  }, [initialState]);

  return () => store;
}

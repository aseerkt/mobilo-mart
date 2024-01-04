import { Address } from '@/types/address';
import { v4 } from 'uuid';
import { StoreSlice } from '../types/store';

export type AddressState = {
  currentAddressId?: string;
  addresses: Address[];
};

export interface AddressSlice extends AddressState {
  addAddress: (address: Partial<Address>) => void;
  editAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  selectAddress: (id: string) => void;
}

export const addressInitialState: AddressState = {
  addresses: [],
};

const useAddressStore: StoreSlice<AddressSlice> = (set, get) => ({
  ...addressInitialState,
  addAddress: (address) => {
    return set({
      addresses: get().addresses.concat({
        id: v4(),
        ...address,
      } as Address),
    });
  },
  editAddress: (address) =>
    set({
      addresses: get()
        .addresses.filter((a) => a.id !== address.id)
        .concat(address as Address),
    }),
  removeAddress: (id) =>
    set({ addresses: get().addresses.filter((a) => a.id !== id) }),
  selectAddress: (id) =>
    set({ currentAddressId: get().addresses.find((a) => a.id === id)?.id }),
});

export const addressSelectors = {
  hasCurrentAddressSelector: (state: AddressSlice) =>
    state.addresses.some((a) => a.id === state.currentAddressId),
  getCurrentAddressSelector: (state: AddressSlice) =>
    state.addresses.find((a) => a.id === state.currentAddressId),
};

export default useAddressStore;

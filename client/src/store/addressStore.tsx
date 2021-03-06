import { v4 } from 'uuid';
import { Address } from '@/types/address';
import { StoreSlice } from '../types/store';

export interface AddressSlice {
  currentAddressId?: string;
  addresses: Address[];
  hasCurrentAddress: () => boolean;
  getCurrentAddress: () => Address | null;
  addAddress: (address: Partial<Address>) => void;
  editAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  selectAddress: (id: string) => void;
}

const useAddressStore: StoreSlice<AddressSlice> = (set, get) => ({
  addresses: [],
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
  hasCurrentAddress: () =>
    get().addresses.some((a) => a.id === get().currentAddressId),
  getCurrentAddress: () =>
    get().addresses.find((a) => a.id === get().currentAddressId),
  removeAddress: (id) =>
    set({ addresses: get().addresses.filter((a) => a.id !== id) }),
  selectAddress: (id) =>
    set({ currentAddressId: get().addresses.find((a) => a.id === id)?.id }),
});

export default useAddressStore;

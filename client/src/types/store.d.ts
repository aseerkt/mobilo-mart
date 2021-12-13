import { SetState, GetState } from 'zustand';

export type StoreSlice<T> = (set: SetState<T>, get: GetState<T>) => T;

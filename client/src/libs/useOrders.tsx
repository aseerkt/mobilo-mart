import useSWR from 'swr';
import { Order } from '../types/order';

function useOrders() {
  const { data, error, revalidate } = useSWR('/orders');
  return {
    orders: data as Order[] | null,
    loading: !data && !error,
    error,
    revalidate,
  };
}

export default useOrders;

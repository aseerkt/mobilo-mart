import useSWR from 'swr';
import { Order } from '../types/order';

function useOrders() {
  const { data, error, mutate } = useSWR('/api/orders');

  return {
    orders: data as Order[] | null,
    loading: !data && !error,
    error,
    mutate,
  };
}

export default useOrders;

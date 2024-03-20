import useSWR from 'swr';
import { Order } from '../../types/order';
import fetcher from '../fetcher';

function useOrders() {
  const { data, error, mutate, isLoading } = useSWR('/api/orders', fetcher);

  return {
    orders: data as Order[] | null,
    loading: isLoading,
    error,
    mutate,
  };
}

export default useOrders;

import { User } from '@/types/user';
import useSWR from 'swr';

function useUser() {
  const { data, error, revalidate } = useSWR('/users');
  return {
    user: data?.user as User | undefined,
    loading: !data && !error,
    error,
    revalidate,
  };
}

export default useUser;

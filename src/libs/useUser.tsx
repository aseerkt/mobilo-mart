import { User } from '@/types/user';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

function useUser(userId?: string) {
  const { data, error, mutate, isLoading } = useSWR(
    userId ? `/api/users/${userId}` : null
  );
  return {
    user: data?.user as User | undefined,
    loading: isLoading,
    error,
    mutate,
  };
}

export function useCurrentUser() {
  const { data: session } = useSession();

  return useUser(session.user.id);
}

export default useUser;

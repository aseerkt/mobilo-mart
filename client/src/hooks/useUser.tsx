import useSWR from 'swr';

function useUser() {
  return useSWR('/api/users');
}

export default useUser;

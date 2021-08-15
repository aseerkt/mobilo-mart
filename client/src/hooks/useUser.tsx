import useSWR from 'swr';

function useUser() {
  const { data, error, revalidate } = useSWR('/api/users');
  return {
    user: data,
    loading: !data && !error,
    error,
    revalidate,
  };
}

export default useUser;

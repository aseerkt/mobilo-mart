import useSWR from 'swr';

function useUser() {
  const { data, error, revalidate } = useSWR('/users');
  return {
    user: data?.user,
    loading: !data && !error,
    error,
    revalidate,
  };
}

export default useUser;

import { useSWRConfig } from 'swr';

const useRevalidate = (key: string) => {
  const { mutate } = useSWRConfig();

  const revalidate = () => mutate(key);

  return revalidate;
};

export default useRevalidate;

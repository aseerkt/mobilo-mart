import wretch from 'wretch';

export const serverApi = wretch(process.env.NEXT_PUBLIC_APP_URL).headers({
  'Content-Type': 'application/json',
});

const fetcher = (url: string) => serverApi.get(url).json<any>();

export default fetcher;

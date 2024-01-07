import axios from 'axios';

axios.defaults.baseURL = `${window.location.protocol}:${window.location.hostname}`;
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';

const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err.message;
  }
};

export default fetcher;

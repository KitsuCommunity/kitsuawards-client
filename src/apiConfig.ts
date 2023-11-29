import { createClient } from 'urql';

const url = import.meta.env.PROD
  ? 'https://api.kitsuawards.com/graphql'
  : import.meta.env.VITE_API_URL;

export const client = createClient({
  url,
});

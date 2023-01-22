import { createClient } from 'urql';

export const client = createClient({
  url: 'http://api.kitsuawards.com/graphql',
});

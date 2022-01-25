import { createClient } from 'urql';

export const client = createClient({
	url: 'https://api.kitsuawards.com/',
});

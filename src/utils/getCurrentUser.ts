import axios from 'axios';

import { globalUser } from 'signals';

const QUERY = `query {
  currentAccount {
    profile {
      id
      name
      avatarImage {
        blurhash
        views(names: ["medium"]) {
          url
          name
        }
      }
    }
  }
}
`;

export const getCurrentUser = async (token: string) => {
    try {
        const data = await axios.post<CurrentAccountRes>(
            'https://kitsu.io/api/graphql',
            {
                query: QUERY,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            },
        );

        const res = data.data;

        return res;
    } catch {
        return null;
    }
};

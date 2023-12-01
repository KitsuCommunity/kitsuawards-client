import axios from 'axios';

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
};

import axios from 'axios';
import { useState } from 'react';

const QUERY = `query {
  currentAccount {
    profile {
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

const useGetUser = (): [
    KitsuUser | null,
    boolean,
    unknown,
    (token: string) => void,
] => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<KitsuUser | null>(null);
    const [error, setError] = useState<unknown>();

    const getUser = (token: string) => {
        axios
            .post('https://kitsu.io/api/graphql', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                query: QUERY,
            })
            .then((req) => {
                setLoading(false);

                const res = req.data as CurrentAccountRes;
                setData(res.data.currentAccount.profile);
            })
            .catch((err) => {
                setLoading(false);
                setError(err.error);
            });
    };

    return [data, loading, error, getUser];
};

export default useGetUser;

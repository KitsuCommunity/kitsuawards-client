import axios from 'axios';
import { useState, useEffect } from 'react';

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

const useGetUser = (token: string): [KitsuUser | null, boolean, any] => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<KitsuUser | null>(null);
  const [error, setError] = useState<{}>();

  useEffect(() => {
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
  }, []);

  return [data, loading, error];
};

export default useGetUser;

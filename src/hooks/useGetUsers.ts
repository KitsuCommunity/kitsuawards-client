import axios from 'axios';
import { useState, useEffect } from 'react';

const useGetUsers = (): [
  KitsuUser[] | null,
  boolean,
  any,
  (userIds: string[]) => void,
] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<KitsuUser[] | null>(null);
  const [error, setError] = useState<{}>();

  const getData = (userIds: string[]) => {
    setLoading(true);
    console.log('started');

    const QUERY = `query {
      ${userIds
        .map((userId, i) => {
          return `profile${userId}: findProfileById(id: ${userId}) {
          name
          id
          avatarImage {
            blurhash
            views(names: ["medium"]) {
              url
              name
            }
          }
        }
        `;
        })
        .join('')}
    }`;

    console.log(QUERY);

    fetch('https://kitsu.io/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: QUERY,
      }),
    })
      .then(async (req) => {
        setLoading(false);

        const res = await req.json();

        const results = userIds.map(
          (userId) => res.data[`profile${userId}`] as KitsuUser,
        );
        setData(results);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.error);
      });
  };

  return [data, loading, error, getData];
};

export default useGetUsers;

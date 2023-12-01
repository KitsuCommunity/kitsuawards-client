import { useState } from 'react';

/**
 * This is used as an optimisation for fetching multiple users from Kitsu at once.
 * Primarily for fetching judges.
 *
 * The getData() function takes a list of userIDs as strings and
 * invokes the fetch request.
 *
 * @example
 * const [{ data, fetching, error }] = useFetchJudgesQuery();
 * const [judgeData, judgeLoading, judgeError, getJudges] = useGetUsers();
 *
 * useEffect(() => {
 *   if (data?.year[0].judges) {
 *     const judges = data.year[0].judges.map((judge) => judge.userId);
 *     getJudges(judges);
 *   }
 * }, [data]);
 *
 * @returns data, loading, error, getData()
 */
const useGetUsers = (): [
    KitsuUser[] | null,
    boolean,
    unknown,
    (userIds: string[]) => void,
] => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<KitsuUser[] | null>(null);
    const [error, setError] = useState<unknown>();

    const getData = (userIds: string[]) => {
        setLoading(true);

        const QUERY = `query {
      ${userIds
          .map((userId) => {
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

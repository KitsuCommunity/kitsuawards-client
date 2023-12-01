import { useEffect } from 'react';

import { ErrorMessage } from 'common';
import { useGetUsers } from 'hooks';

import { Judge } from './Judge';
import { useFetchJudgesQuery } from './Judges.generated';
import styles from './judges.module.css';

export default function Judges() {
    const [{ data, fetching, error }] = useFetchJudgesQuery();

    const [judgeData, _, judgeError, getJudges] = useGetUsers();

    useEffect(() => {
        if (data?.year[0].judges) {
            const judges = data.year[0].judges.map((judge) => judge.userId);
            getJudges(judges);
        }
    }, [data]);

    return (
        <section className={styles.judgesList}>
            <h3>Judges</h3>
            <ul>
                {(error || judgeError) && (
                    <ErrorMessage>Failed to load judges</ErrorMessage>
                )}
                {data && !fetching && !error
                    ? data.year[0].judges.map((judge, i) => {
                          return (
                              <Judge
                                  judge={judgeData?.[i]}
                                  key={`judge${judge.id}`}
                              />
                          );
                      })
                    : data?.year[0].judges.map((judge) => (
                          <Judge key={`judge${judge.userId}`} />
                      ))}
            </ul>
        </section>
    );
}

import useGetUsers from 'hooks/useGetUsers';
import { useEffect } from 'react';
import { Judge } from './Judge';
import { useFetchJudgesQuery } from './Judges.generated';
import styles from './judges.module.css';

interface JudgesProps {}

export default function Judges({}: JudgesProps) {
  const [{ data, fetching, error }] = useFetchJudgesQuery();

  const [judgeData, judgeLoading, judgeError, getJudges] = useGetUsers();

  useEffect(() => {
    if (data?.year[0].judges) {
      const judges = data.year[0].judges.map((judge) => judge.userId);
      getJudges(judges);
    }
  }, [data]);

  useEffect(() => {
    console.log(judgeData);
  }, [judgeData]);

  return (
    <section className={styles.judgesList}>
      <h3>Judges</h3>
      <ul>
        {judgeData && !fetching && !error
          ? judgeData.map((judge) => {
              return <Judge judge={judge} key={`judge${judge.id}`} />;
            })
          : data?.year[0].judges.map((judge) => (
              <Judge key={`judge${judge.userId}`} />
            ))}
      </ul>
    </section>
  );
}

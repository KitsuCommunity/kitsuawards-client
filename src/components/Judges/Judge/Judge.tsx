import { Loading } from 'common/Loading';

import styles from './judge.module.css';

interface JudgeProps {
  judge?: KitsuUser;
}

export default function Judge({ judge }: JudgeProps) {
  return (
    <li className={styles.judgeItem}>
      <a
        href={`https://kitsu.io/users/${judge?.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {judge ? (
          <img src={judge.avatarImage.views[0]?.url} alt="" />
        ) : (
          <Loading className={styles.loading} />
        )}
        <p>{judge?.name || 'loading...'}</p>
      </a>
    </li>
  );
}

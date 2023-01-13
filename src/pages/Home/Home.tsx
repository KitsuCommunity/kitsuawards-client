import { Page } from 'layout/Page';
import { Judges } from 'components/Judges';
import { Link } from 'react-router-dom';
import ProfileCard from 'components/ProfileCard';
import { useContext } from 'react';
import { UserContext } from 'src/App';
import { DateTime } from 'components/DateTime';
import styles from './home.module.css';

interface HomeProps {
  description: string;
  start: string | Date;
  end: string | Date;
}

export const Home = ({ description, start, end }: HomeProps) => {
  const [user] = useContext(UserContext);

  return (
    <Page className={styles.home}>
      <div dangerouslySetInnerHTML={{ __html: description }} />

      <p>
        Voting opens <DateTime dateTime={start} /> and closes{' '}
        <DateTime dateTime={end} />. However, some categories starts at
        different times.
      </p>

      <ProfileCard className={styles.profile} />

      <Judges />
    </Page>
  );
};

export default Home;

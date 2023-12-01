import { DateTime } from 'common';
import { ProfileCard, Judges } from 'components';

import { Page } from 'layout/Page';

import styles from './home.module.css';

interface HomeProps {
    description: string;
    start: string | Date;
    end: string | Date;
}

export const Home = ({ description, start, end }: HomeProps) => {
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

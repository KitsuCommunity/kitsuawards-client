import { Page } from 'layout/Page';
import { Judges } from 'components/Judges';

interface HomeProps {}

export const Home = ({}: HomeProps) => {
  return (
    <Page>
      <h2>Welcome to the Kitsu Anime Awards!</h2>
      <Judges />
    </Page>
  );
};

export default Home;

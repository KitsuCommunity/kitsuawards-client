import { Page } from 'layout/Page';
import { Judges } from 'components/Judges';
import { Link } from 'react-router-dom';

interface HomeProps {
  description: string;
}

export const Home = ({ description }: HomeProps) => {
  return (
    <Page>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <h3>Sign in</h3>
      <Link to="/signin">Sign in</Link>
      <Judges />
    </Page>
  );
};

export default Home;

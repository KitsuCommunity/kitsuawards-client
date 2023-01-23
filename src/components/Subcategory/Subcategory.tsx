import { Loading } from 'common/Loading';
import { Button } from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import { Nominee } from 'components/Nominee';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from 'src/App';
import { SubcategoryFragment } from 'src/graphql/categories.generated';
import { useSubmitVoteMutation } from 'src/graphql/vote.generated';
import styles from './subcategory.module.css';

interface SubcategoryProps {
  subcategory: SubcategoryFragment;
  existingVote?: number;
}

export const Subcategory = ({
  subcategory,
  existingVote,
}: SubcategoryProps) => {
  const { name, nominees } = subcategory;
  const [selected, setSelected] = useState<number | null>(existingVote || null);
  const [user] = useContext(UserContext);
  const [{ data, fetching, error }, submitVote] = useSubmitVoteMutation();
  const [voteMessage, setVoteMessage] = useState('Vote');

  const vote = () => {
    const token = user.token?.access_token;
    if (token && selected) submitVote({ token, nomineeid: selected });
  };

  useEffect(() => {
    if (subcategory.nominees) {
      nominees;
    }
  }, [subcategory]);

  useEffect(() => {
    if (data) {
      setVoteMessage('Voted');
    }
  }, [data]);

  useEffect(() => {
    if (!user.token?.access_token) {
      setVoteMessage('Sign in to Vote');
      return;
    }

    if (existingVote) {
      setVoteMessage('Change Vote');
    }
  }, []);

  useEffect(() => {
    if (!user.token?.access_token) {
      setVoteMessage('Sign in to Vote');
      return;
    }

    if (data?.submitVote?.vote?.nominee.id !== selected) {
      setVoteMessage('Change Vote');
    }
  }, [selected]);

  return (
    <form
      className={styles.subcategory}
      onSubmit={(e) => {
        e.preventDefault();
        vote();
      }}
    >
      <h3>{name}</h3>

      <div className={styles.nominees}>
        {nominees?.map((nominee) => (
          <Nominee
            nominee={nominee}
            currentlySelected={selected}
            select={(id: number) => setSelected(id)}
          />
        ))}
      </div>

      <Button
        type="submit"
        disabled={
          !user.token?.access_token ||
          data?.submitVote?.vote?.nominee.id === selected ||
          existingVote === selected
        }
      >
        {fetching ? '...' : voteMessage}
      </Button>
      {error && (
        <ErrorMessage>
          {error?.message}
          <br />
          Please try again. If the error persists, please let Reina know on{' '}
          <a href="https://matrix.to/#/@reinacchan:matrix.org">Matrix</a>{' '}
          (quickest response) or on{' '}
          <a href="https://kitsu.io/users/Reinachan">Kitsu</a>
        </ErrorMessage>
      )}
    </form>
  );
};
export default Subcategory;

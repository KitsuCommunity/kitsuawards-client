import { signal, useSignal, useSignalEffect } from '@preact/signals';

import { Loading } from 'common/Loading';
import { Button } from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import { Nominee } from 'components/Nominee';
import { globalUser } from 'src/App';
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
  const [{ data, fetching, error }, submitVote] = useSubmitVoteMutation();
  const selected = useSignal<number | undefined>(existingVote);
  const voteMessage = useSignal('Vote');

  const vote = () => {
    const token = globalUser.value.token?.access_token;
    if (token && selected.value) submitVote({ token, nomineeid: selected.value });
  };

  useSignalEffect(() => {
    if (subcategory.nominees) {
      nominees;
    }
  });

  useSignalEffect(() => {
    if (data) {
      voteMessage.value = 'Voted';
    }
  });

  useSignalEffect(() => {
    if (!globalUser.value.token?.access_token) {
      voteMessage.value = 'Sign in to Vote';
      return;
    }

    if (existingVote) {
      voteMessage.value = 'Change Vote';
    }
  });

  useSignalEffect(() => {
    if (!globalUser.value.token?.access_token) {
      voteMessage.value = 'Sign in to Vote';
      return;
    }

    if (data && data?.submitVote?.vote?.nominee.id !== selected.value) {
      voteMessage.value = 'Change Vote';
    }
  });

  const select = (id: number) => selected.value = id;

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
            select={(id: number) => selected.value = id}
          />
        ))}
      </div>

      <Button
        type="submit"
        disabled={
          !globalUser.value.token?.access_token ||
          data?.submitVote?.vote?.nominee.id === selected.value ||
          existingVote === selected.value
        }
      >
        {fetching ? '...' : voteMessage.value}
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

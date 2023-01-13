import { Button } from 'components/Button';
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
      console.log(data);
    }
  }, [data]);

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

      <Button type="submit" disabled={!user.token?.access_token}>
        {!!user.token?.access_token
          ? existingVote
            ? 'Change Vote'
            : 'Vote'
          : 'Sign in to Vote'}
      </Button>
    </form>
  );
};
export default Subcategory;

import { Button } from 'components/Button';
import { Nominee } from 'components/Nominee';
import { useState } from 'react';
import { SubcategoryFragment } from 'src/graphql/categories.generated';
import styles from './subcategory.module.css';

interface SubcategoryProps {
  subcategory: SubcategoryFragment;
}

export const Subcategory = ({ subcategory }: SubcategoryProps) => {
  const { name, nominees } = subcategory;
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <form
      className={styles.subcategory}
      onSubmit={(e) => {
        e.preventDefault();
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
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Vote
      </Button>
    </form>
  );
};
export default Subcategory;

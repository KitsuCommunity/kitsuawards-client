import { Media } from 'components/Media';
import { useEffect, useId, useState } from 'react';
import { NomineeFragment } from 'src/graphql/categories.generated';
import styles from './nominee.module.css';

interface NomineeProps {
  nominee: NomineeFragment;
  currentlySelected: number | null;
  select: (id: number) => void;
}

// TODO: Style this component
export const Nominee = ({
  nominee,
  currentlySelected,
  select,
}: NomineeProps) => {
  const { name, media, id } = nominee;

  const [checked, setChecked] = useState(false);
  const selectionId = useId();

  useEffect(() => {
    if (currentlySelected === id) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [currentlySelected]);

  return (
    <section
      className={[styles.nominee, checked ? styles.active : null].join(' ')}
    >
      <h4>{name}</h4>
      <Media media={media} />
      <div className={styles.vote}>
        <div />
      </div>
      <label htmlFor={selectionId} className={styles.voteLabel}>
        <input
          style={{ display: 'none' }}
          type="checkbox"
          id={selectionId}
          checked={checked}
          onClick={(e) => {
            select(id);
          }}
        />
      </label>
    </section>
  );
};
export default Nominee;

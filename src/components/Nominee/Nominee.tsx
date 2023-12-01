import type { Signal } from '@preact/signals';
import { useComputed } from '@preact/signals';
import { useId } from 'react';

import { Media } from 'components';

import type { NomineeFragment } from 'src/graphql/categories.generated';

import styles from './nominee.module.css';

interface NomineeProps {
    nominee: NomineeFragment;
    currentlySelected: Signal<number | undefined>;
    select: (id: number) => void;
}

export const Nominee = ({
    nominee,
    currentlySelected,
    select,
}: NomineeProps) => {
    const { name, media, id } = nominee;

    const checked = useComputed(() => currentlySelected.value === nominee.id);
    const selectionId = useId();

    return (
        <section
            className={[
                styles.nominee,
                checked.value ? styles.active : null,
            ].join(' ')}
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
                    checked={checked.value}
                    onClick={() => {
                        select(id);
                    }}
                />
            </label>
        </section>
    );
};
export default Nominee;

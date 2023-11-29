import type { ReactNode } from 'react';

import styles from './tag.module.css';

interface TagProps {
  children: ReactNode;
}

export const Tag = ({ children }: TagProps) => {
  return <span className={styles.tag}>{children}</span>;
};

export default Tag;

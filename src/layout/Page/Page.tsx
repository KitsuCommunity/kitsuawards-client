import { ReactNode } from 'react';
import styles from './page.module.css';

interface PageProps {
  children: ReactNode;
}

export const Page = ({ children }: PageProps) => {
  return (
    <div className={styles.page}>
      <main>{children}</main>
    </div>
  );
};

export default Page;

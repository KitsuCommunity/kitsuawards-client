import { ReactNode } from 'react';

import styles from './page.module.css';

interface PageProps {
  children: ReactNode;
  className?: string;
}

export const Page = ({ children, className }: PageProps) => {
  return (
    <div className={[styles.page, className].join(' ')}>
      <main>{children}</main>
    </div>
  );
};

export default Page;

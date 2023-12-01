import type { ReactNode } from 'react';

import styles from './error.module.css';

interface ErrorProps {
    children: ReactNode;
}

export const ErrorMessage = ({ children }: ErrorProps) => {
    return (
        <div className={styles.error}>
            <output>{children}</output>
        </div>
    );
};

export default ErrorMessage;

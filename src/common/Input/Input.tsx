import type { HTMLAttributes } from 'react';

import styles from './input.module.css';

interface InputProps extends HTMLAttributes<HTMLInputElement> {}

export const Input = ({ ...args }: InputProps) => {
    return <input {...args} className={styles.input} />;
};

export default Input;

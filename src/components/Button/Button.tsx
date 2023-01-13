import { Link } from 'react-router-dom';
import styles from './button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'link';
  disabled?: boolean;
  onClick?: (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => void;
  children?: string;
  className?: string;
  to?: string;
}

export const Button = ({
  type,
  disabled,
  onClick,
  children,
  className,
  to,
}: ButtonProps) => {
  if (type === 'submit') {
    return (
      <input
        className={[styles.button, className].join(' ')}
        type="submit"
        onClick={onClick}
        value={children}
        disabled={disabled}
      ></input>
    );
  }

  if (type === 'link' && to) {
    return (
      <Link to={to} className={[styles.button, className].join(' ')}>
        <span>{children}</span>
      </Link>
    );
  }
  return (
    <button
      className={[styles.button, className].join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

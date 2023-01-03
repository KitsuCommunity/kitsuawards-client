import styles from './button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => void;
  children?: string;
}

export const Button = ({
  type = 'button',
  disabled,
  onClick,
  children,
}: ButtonProps) => {
  if ((type = 'button')) {
    return (
      <button className={styles.button} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );
  }

  return (
    <input
      className={styles.button}
      type="submit"
      onClick={onClick}
      value={children}
      disabled={disabled}
    ></input>
  );
};

export default Button;

import type { ReactNode} from 'react';
import { useEffect, useRef } from 'react';

import styles from './modal.module.css';

interface ModalProps {
  children?: ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialog) {
      dialog.current?.show();
    }
  }, [dialog]);

  return (
    <dialog ref={dialog} className={styles.dialog}>
      {children}
    </dialog>
  );
};

export default Modal;

import { Page } from 'layout/Page';
import { LegacyRef, ReactElement, useEffect, useRef, useState } from 'react';
import styles from './modal.module.css';

interface ModalProps {
  children?: ReactElement;
}

export const Modal = ({ children }: ModalProps) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialog) {
      dialog.current?.show();
    }
  }, [dialog]);

  const open = () => {};

  return (
    <dialog ref={dialog} className={styles.dialog}>
      {children}
    </dialog>
  );
};

export default Modal;

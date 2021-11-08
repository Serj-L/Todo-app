import { FC, ReactNode } from 'react';

import { CrossIcon } from '../index';

import styles from './Modal.module.css';

interface ModalProps {
  isModalActive: boolean;
  modalTitle?: string;
  closeModalHandler: () => void;
  children?: ReactNode
}

const Modal: FC<ModalProps> = ({
  isModalActive = false,
  modalTitle = 'Modal window',
  closeModalHandler,
  children = null,
}) => {
  return isModalActive ?
    (
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>{modalTitle}</h3>
            <button
              className={styles.btnClose}
              onClick = {closeModalHandler}
            >
              <CrossIcon />
            </button>
          </div>
          <div className={styles.modalContent}>
            {children}
          </div>
        </div>
        <div
          className={styles.modalLayout}
          onClick = {closeModalHandler}
        >
        </div>
      </div>
    ) : null;
};

export default Modal;

import { FC, useState, useEffect } from 'react';

import styles from './SnackBar.module.css';

interface SnackBarProps {
  message: string;
  clearMsg: () => void;
  duration?: number;
}

const SnackBar: FC<SnackBarProps> = ({
  message,
  clearMsg,
  duration = 6000,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!message) {
      return;
    }
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
      clearMsg();
    }, duration);
  }, [message, clearMsg, duration]);

  return (
    <div
      className={styles.snackBarWrapper}
      data-is-open={isOpen}
    >
      <p className={styles.snackBarText}>{message}</p>
    </div>
  );
};

export default SnackBar;

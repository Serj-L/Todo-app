import { FC, useState, useEffect } from 'react';

import styles from './SnackBar.module.css';

interface SnackBarProps {
  message: string;
  duration?: number;
}

const SnackBar: FC<SnackBarProps> = ({
  message,
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
    }, duration);
  }, [duration, message]);

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

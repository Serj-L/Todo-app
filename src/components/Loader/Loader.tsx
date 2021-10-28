import { FC } from 'react';

import styles from './Loader.module.css';

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => {
  return (
    <div className={styles.loader}><div></div><div></div><div></div><div></div></div>
  );
};

export default Loader;

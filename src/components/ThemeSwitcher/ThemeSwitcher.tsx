import { FC } from 'react';

import { ThemeTypes } from '../../types/types';
import { SunIcon, MoonIcon } from '../../components/index';

import styles from './ThemeSwitcher.module.css';

interface ThemeSwitcherProps {
  themeType: string;
  onClickHandler: () => void;
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({
  themeType = ThemeTypes.LIGHT,
  onClickHandler,
}) => {
  return (
    <div
      className={styles.wrapper}
      onClick={onClickHandler}
    >
      {themeType === ThemeTypes.LIGHT
        ?
        <SunIcon />
        :
        <MoonIcon />
      }
    </div>
  );
};

export default ThemeSwitcher;

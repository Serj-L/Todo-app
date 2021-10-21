import { useEffect, useState } from 'react';

import { AppRouter, ThemeSwitcher } from './components';
import styles from './App.module.css';
import { LocalStorageKeys, ThemeTypes } from './types/types';

function App() {
  const [themeType, setThemeType] = useState(localStorage.getItem(LocalStorageKeys.THEMETYPE) || ThemeTypes.LIGHT);

  const toggleThemeType = () => {
    setThemeType(themeType === ThemeTypes.LIGHT ? ThemeTypes.DARK: ThemeTypes.LIGHT);
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', themeType);

    if (localStorage.getItem(LocalStorageKeys.THEMETYPE) !== themeType) {
      localStorage.setItem(LocalStorageKeys.THEMETYPE, themeType);
    }
  }, [themeType]);

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>todo</h1>
        <ThemeSwitcher
          themeType={themeType}
          onClickHandler={toggleThemeType}
        />
      </header>
      <AppRouter />
    </div>
  );
}

export default App;

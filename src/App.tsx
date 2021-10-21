import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';

import { LocalStorageKeys, ThemeTypes } from './types/types';
import { RootState } from './store/index';
import { setUserId } from './store/userSlice';
import { useAppSelector, useAppDispatch } from './hooks/redux';
import { AppRouter, ThemeSwitcher, SnackBar } from './components';

import styles from './App.module.css';

function App() {
  const [themeType, setThemeType] = useState<string>(localStorage.getItem(LocalStorageKeys.THEMETYPE) || ThemeTypes.LIGHT);
  const { userId, authErrMsg } = useAppSelector((state: RootState) => state.user);
  const reduxDispatch = useAppDispatch();

  const toggleThemeType = () => {
    setThemeType(themeType === ThemeTypes.LIGHT ? ThemeTypes.DARK: ThemeTypes.LIGHT);
  };

  const logOut = () => {
    signOut(getAuth());
    localStorage.removeItem(LocalStorageKeys.USERAUTHTOKEN);
    reduxDispatch(setUserId(''));
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', themeType);

    if (localStorage.getItem(LocalStorageKeys.THEMETYPE) !== themeType) {
      localStorage.setItem(LocalStorageKeys.THEMETYPE, themeType);
    }
  }, [themeType]);

  return (
    <div className={styles.App}>
      <SnackBar
        message = {authErrMsg}
        duration = {8000}
      />
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>todo</h1>
        <ThemeSwitcher
          themeType = {themeType}
          onClickHandler = {toggleThemeType}
        />
        {userId && <button onClick = {logOut}>LogOut</button>}
      </header>
      <AppRouter />
    </div>
  );
}

export default App;

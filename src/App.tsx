import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';

import { LocalStorageKeys, ThemeTypes } from './types/types';
import { RootState } from './store/index';
import { setUserId, setAuthErrMsg } from './store/userSlice';
import { getTodosFromDbThunk, saveTodosToDbThunk, setTodosErrMsg } from './store/todosSlice';
import { useAppSelector, useAppDispatch } from './hooks/redux';
import { AppRouter, ThemeSwitcher, SnackBar, UserAvatar } from './components';

import { auth } from './api/firebase';

import styles from './App.module.css';

function App() {
  const [themeType, setThemeType] = useState<string>(localStorage.getItem(LocalStorageKeys.THEMETYPE) || ThemeTypes.LIGHT);
  const [userName, setUserName] = useState<string | null>('');
  const { userId, authErrMsg } = useAppSelector((state: RootState) => state.user);
  const { todoList, updateDb, todosErrMsg } = useAppSelector((state: RootState) => state.todos);
  const reduxDispatch = useAppDispatch();

  const toggleThemeType = () => {
    setThemeType(themeType === ThemeTypes.LIGHT ? ThemeTypes.DARK: ThemeTypes.LIGHT);
  };
  const logOut = () => signOut(getAuth());
  const clearErrMsg = () => {
    if (authErrMsg) {
      reduxDispatch(setAuthErrMsg(''));
    }
    if (todosErrMsg) {
      reduxDispatch(setTodosErrMsg(''));
    }
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', themeType);

    if (localStorage.getItem(LocalStorageKeys.THEMETYPE) !== themeType) {
      localStorage.setItem(LocalStorageKeys.THEMETYPE, themeType);
    }
  }, [themeType]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserName(user.email);
      } else {
        localStorage.removeItem(LocalStorageKeys.USERAUTHTOKEN);
        reduxDispatch(setUserId(''));
      }
    });
    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!userId) return;
    reduxDispatch(getTodosFromDbThunk(userId));
  }, [userId, reduxDispatch]);

  useEffect(() => {
    if (!updateDb) {
      return;
    }
    reduxDispatch(saveTodosToDbThunk({ todoList, userId }));
  }, [updateDb, todoList, userId, reduxDispatch]);

  return (
    <div className={styles.App}>
      <SnackBar
        message = {authErrMsg ? authErrMsg : todosErrMsg ? todosErrMsg : ''}
        clearMsg={clearErrMsg}
        duration = {8000}
      />
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>todo</h1>
        <div className={styles.controlsWrapper}>
          <ThemeSwitcher
            themeType = {themeType}
            onClickHandler = {toggleThemeType}
          />
          {userId && <UserAvatar
            user={userName ? userName : 'User'}
            logOut={logOut}/>}
        </div>
      </header>
      <AppRouter />
    </div>
  );
}

export default App;

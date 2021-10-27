import React, { FC, useState } from 'react';

import { RootState } from '../../store/index';
import { IUserLoginInput } from '../../types/types';
import { userAuthThunk } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { AuthForm } from '../../components/index';

import styles from './AuthPage.module.css';

interface AuthPageProps {}

const AuthPage: FC<AuthPageProps> = () => {
  const [isSignedForm, setIsSignedForm] = useState<boolean>(false);
  const [userLogin, setUserLogin] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const { isAuthing } = useAppSelector((state: RootState) => state.user);
  const reduxDispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: IUserLoginInput = {
      userEmail: userLogin,
      password: userPassword,
      isSignedForm: isSignedForm,
    };
    reduxDispatch(userAuthThunk(data));
  };
  const onSwitchChange = () => setIsSignedForm(!isSignedForm);
  const onLoginChange = (value: string) => setUserLogin(value);
  const onPasswordChange = (value: string) => setUserPassword(value);

  return (
    <div className={styles.wrapper}>
      <AuthForm
        onSubmit = {onSubmit}
        onSwitchChange = {onSwitchChange}
        onLoginChange = {onLoginChange}
        onPasswordChange = {onPasswordChange}
        userLogin = {userLogin}
        userPassword = {userPassword}
        isSignedForm = {isSignedForm}
        isAuthing = {isAuthing}
      />
    </div>
  );
};

export default AuthPage;

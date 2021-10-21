import React, { FC, useState } from 'react';

import { IUserLoginInput } from '../../types/types';
import { userAuthThunk } from '../../store/userSlice';
import { useAppDispatch } from '../../hooks/redux';
import { AuthForm } from '../../components/index';

interface AuthPageProps {}

const AuthPage: FC<AuthPageProps> = () => {
  const [isSignedForm, setIsSignedForm] = useState<boolean>(false);
  const [userLogin, setUserLogin] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
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
    <>
      <AuthForm
        onSubmit = {onSubmit}
        onSwitchChange = {onSwitchChange}
        onLoginChange = {onLoginChange}
        onPasswordChange = {onPasswordChange}
        userLogin = {userLogin}
        userPassword = {userPassword}
        isSignedForm = {isSignedForm}
      />
    </>
  );
};

export default AuthPage;

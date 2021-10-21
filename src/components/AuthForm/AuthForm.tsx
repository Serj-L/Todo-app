import React, { FC, useState, useEffect } from 'react';

import { CustomCheckbox } from '../index';

import styles from './AuthForm.module.css';

interface AuthFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onSwitchChange: () => void;
  onLoginChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  userLogin: string;
  userPassword: string;
  isSignedForm: boolean;
}

const AuthForm: FC<AuthFormProps> = ({
  onSubmit,
  onSwitchChange,
  onLoginChange,
  onPasswordChange,
  userLogin = '',
  userPassword = '',
  isSignedForm = false,
}) => {
  const [isBtnDissabled, setIsBtnDissabled] = useState<boolean>(true);

  useEffect(() => {
    if (userLogin && userPassword) {
      setIsBtnDissabled(false);
    } else {
      if (!isBtnDissabled) {
        setIsBtnDissabled(true);
      }
    }
  }, [isBtnDissabled, userLogin, userPassword]);

  return (
    <form onSubmit = {(e) => onSubmit(e)}>
      <h3>AuthForm</h3>
      <label className={styles.loginLabel}>Login (e-mail): *
        <input
          className={styles.loginInput}
          type="text"
          value = {userLogin}
          onChange = {(e) => onLoginChange(e.target.value)}
          placeholder='Enter your login'
        />
        <span className={styles.loginInputError}></span>
      </label>
      <label className={styles.passwordLabel}>Password (at least 6 chars): *
        <input
          className={styles.passwordInput}
          type="password"
          value = {userPassword}
          onChange = {(e) => onPasswordChange(e.target.value)}
          placeholder='Enter your password'
        />
        <span className={styles.passwordInputError}></span>
      </label>
      <div className={styles.switcherWrapper}>
        <CustomCheckbox
          isChecked = {isSignedForm}
          toggleIsChecked = {onSwitchChange}
        />
        New user registration and Sign In
      </div>
      <button
        className={styles.btn}
        disabled={isBtnDissabled}
      >
        {isSignedForm ? 'Sign In' : 'Log In'}
      </button>
    </form>
  );
};

export default AuthForm;

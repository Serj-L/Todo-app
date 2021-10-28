import React, { FC, useState, useEffect, useRef } from 'react';

import { CustomCheckbox, EyeIcon, EyeSlashIcon } from '../index';

import styles from './AuthForm.module.css';

interface AuthFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onSwitchChange: () => void;
  onLoginChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  userLogin: string;
  userPassword: string;
  isSignedForm: boolean;
  isAuthing: boolean;
}

const AuthForm: FC<AuthFormProps> = ({
  onSubmit,
  onSwitchChange,
  onLoginChange,
  onPasswordChange,
  userLogin = '',
  userPassword = '',
  isSignedForm = false,
  isAuthing = false,
}) => {
  const [isBtnDissabled, setIsBtnDissabled] = useState<boolean>(true);
  const [passwordInputType, setPasswordInputType] = useState<string>('password');
  const passwordInputRef = useRef<HTMLInputElement>(null);

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
    <form
      className={styles.authForm}
      onSubmit = {(e) => onSubmit(e)}
    >
      <h3 className={styles.title}>{isSignedForm ? 'Sign In Form' : 'Log In Form'}</h3>
      <label className={styles.loginLabel}>Login (e-mail): *
        <input
          className={styles.loginInput}
          type="text"
          value = {userLogin}
          onChange = {(e) => onLoginChange(e.target.value)}
          placeholder='Enter your login...'
        />
      </label>
      <label
        className={styles.passwordLabel}
        htmlFor='passwordInput'
      >
          Password (at least 6 chars): *
      </label>
      <div className={styles.passwordInputWrapper}>
        {
          passwordInputType === 'password'
            ?
            <div
              className={styles.icon}
              onClick={() => {
                setPasswordInputType('text');
                passwordInputRef.current?.focus();
              }}
            >
              <EyeSlashIcon />
            </div>
            :
            <div
              className={styles.icon}
              onClick={() => {
                setPasswordInputType('password');
                passwordInputRef.current?.focus();
              }}
            >
              <EyeIcon />
            </div>
        }
        <input
          className={styles.passwordInput}
          type={passwordInputType}
          id='passwordInput'
          ref={passwordInputRef}
          value = {userPassword}
          onChange = {(e) => onPasswordChange(e.target.value)}
          placeholder='Enter your password...'
        />
      </div>
      <span className={styles.text}>* required fields</span>
      <div className={styles.switcherWrapper}>
        <CustomCheckbox
          isChecked = {isSignedForm}
          toggleCheckBoxHandler = {onSwitchChange}
        />
        <div className={styles.switcherLabel}>Register and Sign In</div>
      </div>
      <button
        className={styles.btn}
        disabled={isBtnDissabled}
        onClick = {(e) => e.currentTarget.blur()}
      >
        {isAuthing ? 'Authing...' : isSignedForm ? 'Sign In' : 'Log In'}
      </button>
    </form>
  );
};

export default AuthForm;

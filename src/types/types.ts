/* eslint-disable no-unused-vars */
import React from 'react';

export interface IRoute {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  LOGIN = '/auth',
  TODOLIST = '/',
}

export enum LocalStorageKeys {
  THEMETYPE = 'TodoAppThemeType',
  USERAUTHTOKEN = 'TodoAppAuthToken',
}

export enum ThemeTypes {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface IUserState {
  userId: string;
  authErrMsg: string;
}

export interface IUserLoginInput {
  userEmail: string;
  password: string;
  isSignedForm: boolean;
}

export interface IFirebaseLoginResponse {
  uid: string;
}

export interface ITodosSlice {
  todoList: ITodoItem[];
  updateDb: boolean;
  isLoading: boolean;
  isError: boolean;
}
export interface ITodoItem {
  id: string;
  title: string;
  isCompleted: boolean;
}
export interface ITodoListFirebase {
  userId: string;
  todoList: ITodoItem[];
}

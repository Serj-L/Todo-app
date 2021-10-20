/* eslint-disable no-unused-vars */
import React from 'react';

export interface IRoute {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  LOGIN = '/login',
  TODOLIST = '/',
}

export interface IUserState {
  userId: string;
}

export interface IUserLoginInput {
  userEmail: string;
  password: string;
  isSignedForm: boolean;
}

export interface IFirebaseLoginResponse {
  uid: string;
}
import { LoginPage, TodoListPage } from '../../pages';
import { IRoute, RouteNames } from '../../types/types';

export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.LOGIN,
    exact: true,
    component: LoginPage,
  },
];

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.TODOLIST,
    exact: true,
    component: TodoListPage,
  },
];

import { IRoute, RouteNames } from '../../types/types';
import { AuthPage, TodoListPage } from '../../pages';

export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.LOGIN,
    exact: true,
    component: AuthPage,
  },
];

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.TODOLIST,
    exact: true,
    component: TodoListPage,
  },
];

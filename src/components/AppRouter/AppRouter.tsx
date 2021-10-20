import { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { RouteNames } from '../../types/types';
import { privateRoutes, publicRoutes } from '../../pages/router';

interface AppRouterProps {}

const AppRouter: FC<AppRouterProps> = () => {
  const isAuth = true;
  const currentRoutes = isAuth ? privateRoutes : publicRoutes;

  return (
    <Switch>
      {currentRoutes.map(route =>
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />,
      )}
      <Redirect to={isAuth ? RouteNames.TODOLIST : RouteNames.LOGIN}/>
    </Switch>
  );
};

export default AppRouter;

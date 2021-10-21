import { FC, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { RouteNames, IRoute } from '../../types/types';
import { RootState } from '../../store/index';
import { useAppSelector } from '../../hooks/redux';
import { privateRoutes, publicRoutes } from '../router';

interface AppRouterProps {}

const AppRouter: FC<AppRouterProps> = () => {
  const { userId } = useAppSelector((state: RootState) => state.user);
  const [currentRoutes, setCurrentRoutes] = useState<IRoute[]>(publicRoutes);

  useEffect(() => {
    userId ? setCurrentRoutes(privateRoutes) : setCurrentRoutes(publicRoutes);
  }, [userId]);

  return (
    <Switch>
      {currentRoutes.map(route =>
        <Route
          key = {route.path}
          path = {route.path}
          exact = {route.exact}
          component = {route.component}
        />,
      )}
      <Redirect to = {userId ? RouteNames.TODOLIST : RouteNames.LOGIN}/>
    </Switch>
  );
};

export default AppRouter;

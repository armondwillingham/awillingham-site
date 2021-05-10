import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { NotFound } from './404';
import { BasePage } from './BasePage';
import { RoutePair } from './Routes';

interface RouteListProps {
    routes: RoutePair[];
    toggleTheme: () => void;
}

export const RouteList: React.FC<RouteListProps> = ({ routes, toggleTheme }: RouteListProps) => {
    const routeComponents: JSX.Element[] = routes.map((v, i) => (
        <Route exact path={v.route} key={i}>
            <BasePage toggleTheme={toggleTheme}>{React.createElement<any>(v.component)}</BasePage>
        </Route>
    ));

    return (
        <Switch>
            {routeComponents}
            <Route>
                <NotFound toggleTheme={toggleTheme} />
            </Route>
        </Switch>
    );
};

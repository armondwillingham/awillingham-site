import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { NotFound } from './404';
import { RoutePair } from './Routes';

interface RouteListProps {
    routes: RoutePair[];
    toggleTheme: () => void;
}

export const RouteList = ({ routes, toggleTheme }: RouteListProps): JSX.Element => {
    const routeComponents: JSX.Element[] = routes.map((v, i) => (
        <Route exact path={v.route} key={i}>
            {React.createElement<any>(v.component, { toggleTheme })}
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

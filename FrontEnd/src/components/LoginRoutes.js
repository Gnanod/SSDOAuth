import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from "./views/Login/Login";

class LoginRoutes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact  path='/' component={Login} />
            </Switch>
        );
    }
}

export default LoginRoutes;

import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import {Files} from "./views/admin/Files/Files";
import Logout from "./views/LogOut/Logout";

class Routes extends React.Component {
    render() {
        return (
            <Switch>

                <Route path='/blogs' component={Files}/>
                <Route exact path='/logout' component={Logout}/>
            </Switch>
        );
    }
}

export default Routes;

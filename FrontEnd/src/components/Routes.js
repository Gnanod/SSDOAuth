import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {Blogs} from "./views/admin/Blogs/Blogs";
import Logout from "./views/LogOut/Logout";

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/blogs' component={Blogs}/>
                <Route exact path='/logout' component={Logout}/>

            </Switch>
        );
    }
}

export default Routes;

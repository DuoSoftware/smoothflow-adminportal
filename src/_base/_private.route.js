import React from 'react';
import { Route } from 'react-router-dom';
import Auth from './_auth.redirect.js';
import URLs from './_urls';

const cook = document.cookie.split('; ');
let _t = null;

for(const c of cook) {
    const a = c.split('=');
    if(a[0] === 'satellizer_token') {
        _t = c.split('=')[1];
    }
}

const PrivateRoute = ({ component: Component, is_logged_in, ...rest }) => (
    <Route
        { ...rest }
        render = {
            // (props) => _t
            // (props) => is_logged_in
            (props) => true
            ?   <Component {...props} />
            :   <Auth url={URLs.auth.signin} _rollback_point={window.location.href} />
        }
    />
);

export default PrivateRoute;
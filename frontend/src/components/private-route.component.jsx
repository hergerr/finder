import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getSession } from '../assets/auth-utils';

// https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e
const PrivateRoute = ({component: Component, ...rest}) => {
    console.log(rest);
    
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            getSession() ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;
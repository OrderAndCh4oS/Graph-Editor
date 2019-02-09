import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const userIsAuthenticated = () => {
    return true;
};

const userIsNotAuthenticated = () => {
    return false;
};

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest} render={props =>
            userIsAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: {from: props.location},
                    }}
                />
            )
        }
        />
    );
};

export { userIsAuthenticated, userIsNotAuthenticated, PrivateRoute };
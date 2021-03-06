import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import { isAuthenticated } from '.';


const PrivateRoute =({ component:Component, ...rest }) =>{
      // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated() ? (
            <Component {...props}/>
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
  export default PrivateRoute;
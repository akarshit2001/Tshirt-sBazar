import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../helper/index';


const AdminRoutes =({ component:Component, ...rest }) =>{
   
    return (
      
      <Route
      
        {...rest}
        render={props =>
          isAuthenticated() && isAuthenticated().User.Role==1? (
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
  export default AdminRoutes;
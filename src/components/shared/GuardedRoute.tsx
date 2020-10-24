import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { isUserLoggedIn } from "src/services/auth";
const GuardedRoute = (props: RouteProps) => {
  const isAuth = isUserLoggedIn();
  const { component: Component } = props;
  if (isAuth) {
    if (Component) {
      return (
        <Route {...props} render={(props) => <Component {...props} />}></Route>
      );
    } else {
      return <Route {...props}></Route>;
    }
  } else {
    return (
      <Route>
        <Redirect to="/login" />
      </Route>
    );
  }
};

export default GuardedRoute;

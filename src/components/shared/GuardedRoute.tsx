import React, { useEffect } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { isUserLoggedIn } from "src/services/auth";
import { setNewAccessTokenIfExpired } from "src/services/jwt";
const GuardedRoute = (props: RouteProps) => {
  // useEffect(() => {
  //   setNewAccessTokenIfExpired().then(token => )

  // }, []);
  const isAuth = isUserLoggedIn();

  const { comp: Component } = props;
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

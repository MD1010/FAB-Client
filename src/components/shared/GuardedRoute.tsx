import React, { useEffect } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { isUserLoggedIn } from "src/services/auth";
import { setNewAccessTokenIfExpired } from "src/services/jwt";
import NavBar from "../NavBar/NavBar";
const GuardedRoute = (props: RouteProps) => {
  const isAuth = isUserLoggedIn();

  const { comp: Component } = props;
  if (isAuth) {
    if (Component) {
      return (
        <>
          {isUserLoggedIn() ? <NavBar /> : null}
          <Route
            {...props}
            render={(props) => <Component {...props} />}
          ></Route>
        </>
      );
    } else {
      return (
        <>
          {isUserLoggedIn() ? <NavBar /> : null}
          <Route {...props}></Route>
        </>
      );
    }
  } else {
    return (
      <>
        {isUserLoggedIn() ? <NavBar /> : null}
        <Route>
          <Redirect to="/login" />
        </Route>
      </>
    );
  }
};

export default GuardedRoute;

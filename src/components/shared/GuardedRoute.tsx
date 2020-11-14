import React, { useContext, useEffect } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AppContext } from "src/context/AppContext";
import { setNewAccessTokenIfExpired } from "src/services/jwt";
import NavBar from "../NavBar/NavBar";

const GuardedRoute = (props: RouteProps) => {
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);
  const { comp: Component } = props;
  if (loggedInUser) {
    if (Component) {
      return (
        <>
          <Route
            {...props}
            render={(props) => <Component {...props} />}
          ></Route>
        </>
      );
    } else {
      return (
        <>
          <Route {...props}></Route>
        </>
      );
    }
  } else {
    return (
      <>
        <Route>
          <Redirect to="/login" />
        </Route>
      </>
    );
  }
};

export default GuardedRoute;

import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/Login/LoginPage";
import ManageAccounts from "./components/ManageAccounts/ManageAccounts";
import NavBar from "./components/NavBar/NavBar";
import GuardedRoute from "./components/shared/GuardedRoute";
import AccountProvider from "./context/AccountsContext";
import { AppContext } from "./context/AppContext";
import EntitiesContextProvider from "./context/EntitiesContext";
import { isUserLoggedIn } from "./services/auth";
import { setNewAccessTokenIfExpired } from "./services/jwt";

const App = () => {
  const { loggedInUser } = useContext(AppContext);
  console.log(loggedInUser);
  console.log("app is loaded!!!!!");

  console.log("is logged in app ?", isUserLoggedIn());
  useEffect(() => {
    (async () => await setNewAccessTokenIfExpired())();
  }, []);

  console.log("rendered");

  return (
    <Router>
      {loggedInUser ? <NavBar /> : null}
      <Switch>
        <GuardedRoute exact path="/home" comp={HomePage} />
        <GuardedRoute exact path="/" comp={HomePage} />
        <Route
          exact
          path="/login"
          render={(props) =>
            loggedInUser ? <Redirect to="/" /> : <LoginPage />
          }
        />

        <GuardedRoute
          exact
          path="/accounts"
          render={() => (
            <AccountProvider>
              <EntitiesContextProvider>
                <ManageAccounts />
              </EntitiesContextProvider>
            </AccountProvider>
          )}
        />
        <GuardedRoute exact path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
};

export default App;

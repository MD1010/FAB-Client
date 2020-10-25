import React, { useEffect } from "react";
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
import GuardedRoute from "./components/shared/GuardedRoute";
import AccountProvider from "./context/AccountsContext";
import EntitiesContextProvider from "./context/EntitiesContext";
import { isUserLoggedIn } from "./services/auth";
import { setNewAccessTokenIfExpired } from "./services/jwt";

const App = () => {
  useEffect(() => {
    (async () => await setNewAccessTokenIfExpired())();
  }, []);

  return (
    <Router>
      <Switch>
        <GuardedRoute exact path="/home" comp={HomePage} />
        <GuardedRoute exact path="/" comp={HomePage} />
        <Route
          exact
          path="/login"
          render={(props) =>
            isUserLoggedIn() ? <Redirect to="/" /> : <LoginPage />
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

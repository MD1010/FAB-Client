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

const App = () => {
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);

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

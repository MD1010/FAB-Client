import React from "react";
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

const App = () => {
  return (
    <Router>
      <Switch>
        <GuardedRoute exact path="/home" component={HomePage} />
        <GuardedRoute exact path="/" component={HomePage} />
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
      </Switch>
    </Router>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NestedGrid from "./components/homePageGrid/GridPage";
import LoginPage from "./components/Login/LoginPage";
import ManageAccounts from "./components/ManageAccounts/ManageAccounts";
import GuardedRoute from "./components/shared/GuardedRoute";
import AccountProvider from "./context/AccountsContext";
import EntitiesContextProvider from "./context/EntitiesContext";
import { isUserLoggedIn } from "./services/auth";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/home" component={NestedGrid} />
          <Route exact path="/login" component={LoginPage} />
          <Route
            exact
            path="/"
            render={(props) =>
              isUserLoggedIn() ? <NestedGrid {...props} /> : <LoginPage />
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

          {/* <NewLogin /> */}
        </Switch>
        {/* <LoginPage /> */}
      </div>
    </Router>
  );
};

export default App;

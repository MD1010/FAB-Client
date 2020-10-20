import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NestedGrid from "./components/homePageGrid/GridPage";
import LoginPage from "./components/Auth/LoginPage";
import ManageAccounts from "./components/ManageAccounts/ManageAccounts";
import AccountProvider from "./context/AccountsContext";
import EntitiesContextProvider from "./context/EntitiesContext";
import { checkIfUserLoggedIn } from "./components/Auth/auth";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/home" component={NestedGrid} />
          <Route
            exact
            path="/"
            render={() =>
              checkIfUserLoggedIn() ? <NestedGrid /> : <LoginPage />
            }
          />

          <Route
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

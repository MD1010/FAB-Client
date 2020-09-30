import React from 'react';
import './App.css';
import ManageAccounts from './components/ManageAccounts/ManageAccounts';
import AccountProvider from './context/AccountsContext';
import EntitiesContextProvider from './context/EntitiesContext';

const App = () => {
  return (
    <div className='App'>
      <AccountProvider>
        <EntitiesContextProvider>
          <ManageAccounts />
        </EntitiesContextProvider>
      </AccountProvider>
    </div>
  );
};

export default App;

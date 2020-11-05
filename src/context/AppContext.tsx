import ActionButton from "antd/lib/modal/ActionButton";
import React, { createContext, FC, useReducer, useState } from "react";
import EaAccount, { EaAccountStatus } from "src/interfaces/EaAccount";
import { Filter } from "src/interfaces/Filter";

export const AppContext = createContext<{
  loggedInUser: string | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<string | null>>;
}>({ loggedInUser: null, setLoggedInUser: () => {} });

const AppProvider: FC = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  return (
    <AppContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

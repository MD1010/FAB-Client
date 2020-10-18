import React, { FC } from "react";
import { useReducer } from "react";
import { Filter } from "src/interfaces/Filter";
import EaAccount, { EaAccountStatus } from "src/interfaces/EaAccount";

export const AccountsContext = React.createContext({
    state: [],
    dispatch: (val: any) => {}
});


export enum ACCOUNTS_ACTIONS {
    FETCH_ACCOUNTS = "FETCH_ACCOUNTS",
    ADD_ACCOUNT = "ADD_ACCOUNT",
    DELETE_ACCOUNT = "DELETE_ACCOUNT",
    UPDATE_ACCOUNT = "UPDATE_ACCOUNT",
    ADD_ACCOUNT_FILTER = "ADD_ACCOUNT_FILTER",
    UPDATE_ACCOUNT_FILTER = "UPDATE_ACCOUNT_FILTER",
    DELETE_ACCOUNT_FILTER = "DELETE_ACCOUNT_FILTER"
}

const reducer = (eaAccounts: EaAccount[], action: any) => {
    switch(action.type) {
        case ACCOUNTS_ACTIONS.FETCH_ACCOUNTS:
            return action.payload;
        case ACCOUNTS_ACTIONS.ADD_ACCOUNT:
            return [...eaAccounts, action.payload.account];
        case ACCOUNTS_ACTIONS.DELETE_ACCOUNT:
            return eaAccounts.filter(ea => ea.email !== action.payload.email);
        case ACCOUNTS_ACTIONS.UPDATE_ACCOUNT:
            return updateAccountStatus(eaAccounts, action.payload.email, action.payload.status);
        case ACCOUNTS_ACTIONS.ADD_ACCOUNT_FILTER:
            return filterAdded(eaAccounts, action.payload.accountId, action.payload.filter);
        case ACCOUNTS_ACTIONS.UPDATE_ACCOUNT_FILTER:
            return filterUpdated(eaAccounts, action.payload.accountId, action.payload.filter);
        case ACCOUNTS_ACTIONS.DELETE_ACCOUNT_FILTER:
            return filterDeleted(eaAccounts, action.payload.accountId, action.payload.filterId);
        default:
            return eaAccounts;
    }
}

const updateAccountStatus = (eaAccounts: EaAccount[], email: string, status: EaAccountStatus) => {
    const newAcc = [...eaAccounts];
    const accountToUpdate = newAcc.find(acc => acc.email === email);
    if (accountToUpdate)
        accountToUpdate.status = status;
    return newAcc;
}

const filterAdded = (eaAccounts: EaAccount[], accountId: string, filter: Filter) => {
    const accIndex = eaAccounts.findIndex(ea => ea.email === accountId);
    const newEaAcc = [...eaAccounts];
    newEaAcc[accIndex].filters.push(filter);
    return newEaAcc;
}

const filterUpdated = (eaAccounts: EaAccount[], accountId: string, filter: any) => {
    const accIndex = eaAccounts.findIndex(ea => ea.email === accountId);
    const newEaAcc = [...eaAccounts];
    let existingfilter = newEaAcc[accIndex].filters.find(f => f.id === filter.id);
    existingfilter = {...filter};
    return newEaAcc;
}

const filterDeleted = (eaAccounts: EaAccount[], accountId: string, filterId: string) => {
    const accIndex = eaAccounts.findIndex(ea => ea.email === accountId);
    const filterIndex = eaAccounts[accIndex]?.filters.findIndex(f => f.id === filterId);
    const newEaAcc = [...eaAccounts];
    if (filterIndex !== undefined)
        newEaAcc[accIndex].filters.splice(filterIndex, 1);
    return newEaAcc;
}

const AccountProvider: FC = ({children}) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <AccountsContext.Provider value={{ state, dispatch }}>
            { children }
        </AccountsContext.Provider>
    );
}

export default AccountProvider;
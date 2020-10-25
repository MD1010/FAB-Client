import { Backdrop, Modal } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import React, { FC, useContext, useEffect, useState } from "react";
import { makeRequest } from "src/services/request";
import {
  ACCOUNTS_ENDPOINT,
  ADD_ACCOUNT_ENDPOINT,
  DELETE_ACCOUNT_ENDPOINT,
} from "src/consts/endpoints";
import { AccountsContext, ACCOUNTS_ACTIONS } from "src/context/AccountsContext";
import EaAccount, { EaAccountStatus } from "src/interfaces/EaAccount";
import { RequestMethod } from "src/types/RequestMethod";
import AccountComp from "../Account/AccountComp";
import AddAccountModal from "../AddAccountModal/AddAccountModal";
import "./ManageAccounts.css";
import { AxiosError } from "axios";

const ManageAccounts: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const accountsContext = useContext(AccountsContext);

  useEffect(() => {
    const initiData = async () => {
      const accounts = await fetchAccounts();
      console.log(accounts);

      accountsContext.dispatch({
        type: ACCOUNTS_ACTIONS.FETCH_ACCOUNTS,
        payload: accounts,
      });
    };
    initiData();
  }, []);

  const addEaAccount = async (email: string) => {
    const [res, error] = await makeRequest({
      method: RequestMethod.POST,
      url: ADD_ACCOUNT_ENDPOINT,
      body: { ea_account: email },
    });
    if (error) return { res: null, error };
    const newAcc: EaAccount = {
      owner: res.owner,
      email: email,
      coinsEarned: 0,
      filters: [],
      selectedFilter: null,
      status: EaAccountStatus.DISCONNECTED,
    };
    accountsContext.dispatch({
      type: ACCOUNTS_ACTIONS.ADD_ACCOUNT,
      payload: { account: newAcc },
    });
    setOpen(false);
    return { res, error: null };
  };

  const deleteEaAccount = async (email: string) => {
    const [res, error] = await makeRequest({
      method: RequestMethod.DELETE,
      url: `${DELETE_ACCOUNT_ENDPOINT}`,
    });
    accountsContext.dispatch({
      type: ACCOUNTS_ACTIONS.DELETE_ACCOUNT,
      payload: { email },
    });
  };

  const fetchAccounts = async () => {
    const [accountsFetched, error] = await makeRequest({
      url: ACCOUNTS_ENDPOINT,
    });
    if (error) {
      console.log((error as AxiosError).request);

      console.log(error);
    }
    if (accountsFetched) {
      const eaAccounts: EaAccount[] = accountsFetched.map((acc) => {
        return {
          owner: acc.owner,
          email: acc.email,
          coinsEarned: acc.coins_earned,
          filters: acc.search_filters,
          selectedFilter: acc.selected_search_filter,
          status: acc.status,
        };
      });
      return eaAccounts;
    }
    return [];
  };

  return (
    <>
      <div className="manage-accounts-container">
        <div className="accounts-list">
          {accountsContext.state.map((eac, index) => (
            <AccountComp
              account={eac}
              key={index}
              onAccountDeleted={deleteEaAccount}
            />
          ))}
        </div>
        <div className="manage-accounts-more">
          <AddCircleOutlineIcon
            className="add-account"
            fontSize="large"
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
      <Modal
        className="modal"
        open={isOpen}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 200 }}
      >
        <div className="modal-form">
          <AddAccountModal addAccount={addEaAccount} />
        </div>
      </Modal>
    </>
  );
};

export default ManageAccounts;

import React, { FunctionComponent, useContext, useState } from "react";
import EaAccount, { EaAccountStatus } from "../../interfaces/EaAccount";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Spinner from "src/components/shared/Spinner";
import Modal from "@material-ui/core/Modal";

import "./AccountComp.css";
import CardFilters from "../CardFilters/CardFilters";
import FilterModal from "../FilterModal/FilterModal";
import { Backdrop } from "@material-ui/core";
import { CSSProperties } from "react";
import {
  DISCONNECT_ACCOUNT,
  FIRST_LOGIN_ACCOUNT,
  LAUNCH_ACCOUNT,
  LAUNCH_WITH_CODE,
  RUN_ACCOUNT,
} from "src/consts/endpoints";
import { RequestMethod } from "src/types/RequestMethod";
import { makeRequest } from "src/services/request";
import LaunchAccountModal from "../WebAppLogin/NewAccountForm/LaunchAccountModal";
import { AccountsContext, ACCOUNTS_ACTIONS } from "src/context/AccountsContext";

type AccountProps = {
  account: EaAccount;
  onAccountDeleted: Function;
};

const AccountComp: FunctionComponent<AccountProps> = ({
  account,
  onAccountDeleted,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isAddFilter, setIsAddFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const accountsContext = useContext(AccountsContext);

  const expandedChanged = () => {
    if (account.filters.length !== 0) setExpanded(!expanded);
  };

  const accountContainer: CSSProperties = {
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    border: "1px solid black",
    borderRadius: "5px",
    color: "black",
    backgroundColor:
      account.status === EaAccountStatus.DISCONNECTED
        ? "red"
        : account.status === EaAccountStatus.CONNECTED
        ? "yellow"
        : "green",
  };

  const onAccountRunHandler = async () => {
    setIsLoading(true);
    const selectedFilter = account.filters.find(
      (f) => f.id === account.selectedFilter
    );
    const searchParameters = selectedFilter
      ? selectedFilter.getSearchParameters()
      : {};
    const configuration = {
      time: 120,
      randomSnipe: false,
      list: false,
    };
    const [res, error] = await makeRequest({
      method: RequestMethod.POST,
      url: RUN_ACCOUNT,
      body: {
        email: account.email,
        configuration: configuration,
        search_parameters: searchParameters,
      },
    });
    if (error) alert(error.msg);
    if (res) {
      alert(res.msg);
      accountsContext.dispatch({
        type: ACCOUNTS_ACTIONS.UPDATE_ACCOUNT,
        payload: { email: account.email, status: EaAccountStatus.RUNNING },
      });
    }
    setIsLoading(false);
  };

  const onAccountConnectHandler = async () => {
    setIsLoading(true);
    const [res, error] = await makeRequest({
      method: RequestMethod.POST,
      url: LAUNCH_ACCOUNT,
      body: { email: account.email },
    });
    if (error) {
      setIsLoading(false);
      return;
    }
    if (res && res.msg === "should login first") {
      setOpen(true);
      return;
    }
    accountsContext.dispatch({
      type: ACCOUNTS_ACTIONS.UPDATE_ACCOUNT,
      payload: { email: account.email, status: EaAccountStatus.CONNECTED },
    });
    setIsLoading(false);
  };

  const onAccountDisconnectHandler = async () => {
    setIsLoading(true);
    const [res, error] = await makeRequest({
      method: RequestMethod.POST,
      url: DISCONNECT_ACCOUNT,
      body: { email: account.email },
    });
    if (res) {
      accountsContext.dispatch({
        type: ACCOUNTS_ACTIONS.UPDATE_ACCOUNT,
        payload: { email: account.email, status: EaAccountStatus.DISCONNECTED },
      });
    }
    setIsLoading(false);
  };

  const connectAccount = async (email: string, password: string) => {
    setIsLoading(true);
    const [res, error] = await makeRequest({
      method: RequestMethod.POST,
      url: FIRST_LOGIN_ACCOUNT,
      body: { password, email },
    });
    if (error) return { res: null, error };
    return { res, error: null };
  };

  const sendCode = async (email: string, code: string) => {
    const [res, error] = await makeRequest({
      method: RequestMethod.POST,
      url: LAUNCH_WITH_CODE,
      body: { code, email },
    });
    if (error) {
      if (error.reason) {
        // service unavailable
        setOpen(false);
        return;
      }
      return { res: null, error };
    }
    setOpen(false);
    accountsContext.dispatch({
      type: ACCOUNTS_ACTIONS.UPDATE_ACCOUNT,
      payload: { email: account.email, status: EaAccountStatus.CONNECTED },
    });
    setIsLoading(false);
    return { res, error: null };
  };

  return (
    <>
      <Modal open={isAddFilter} onClose={() => setIsAddFilter(false)}>
        <>
          <FilterModal
            filter={null}
            accountId={account.email}
            onFilterSet={() => setIsAddFilter(false)}
          />
        </>
      </Modal>
      <Modal
        className="modal"
        open={isOpen}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 200 }}
      >
        <div className="modal-form">
          <LaunchAccountModal
            email={account.email}
            connectAccount={connectAccount}
            sendCode={sendCode}
          />
        </div>
      </Modal>
      <div style={accountContainer} className="account-container">
        <div className="eaacount">
          <span className="account-name">{account.email}</span>
          <div className="account-edits">
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {expanded ? (
                  <ExpandLessIcon
                    className="click-icon"
                    onClick={expandedChanged}
                  />
                ) : (
                  <ExpandMoreIcon
                    className="click-icon"
                    onClick={expandedChanged}
                  />
                )}
                <AddIcon
                  className="click-icon"
                  onClick={() => setIsAddFilter(true)}
                />
                <button
                  className="status-button disconnect"
                  onClick={onAccountDisconnectHandler}
                  disabled={account.status === EaAccountStatus.DISCONNECTED}
                ></button>
                <button
                  className="status-button connect"
                  onClick={onAccountConnectHandler}
                  disabled={
                    account.status === EaAccountStatus.CONNECTED ||
                    account.status === EaAccountStatus.RUNNING
                  }
                ></button>
                <button
                  className="status-button run"
                  onClick={onAccountRunHandler}
                  disabled={account.status === EaAccountStatus.RUNNING}
                ></button>
              </>
            )}
          </div>
        </div>
        <button onClick={() => onAccountDeleted(account.email)}>
          {" "}
          Delete{" "}
        </button>
        {account.filters.length !== 0 && expanded ? (
          <CardFilters
            filters={account.filters}
            accountId={account.email}
            lastChosenFilter={"1"}
          />
        ) : null}
      </div>
    </>
  );
};

export default AccountComp;

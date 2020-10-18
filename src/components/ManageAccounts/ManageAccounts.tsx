import React, { FC, useContext, useEffect, useState } from 'react';
import './ManageAccounts.css';

import { Backdrop, Modal } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import AccountComp from '../Account/AccountComp';
import { AccountsContext, ACCOUNTS_ACTIONS } from 'src/context/AccountsContext';
import EaAccount, { EaAccountStatus } from 'src/interfaces/EaAccount';
import { makeRequest } from 'src/common/makeRequest';
import { ACCOUNTS_ENDPOINT, ADD_ACCOUNT_ENDPOINT, DELETE_ACCOUNT_ENDPOINT } from 'src/consts/endpoints';
import { RequestMethod } from 'src/types/RequestMethod';
import AddAccountModal from '../AddAccountModal/AddAccountModal';

const ManageAccounts: FC = () => {
    const [isOpen, setOpen] = useState<boolean>(false);
  
    const accountsContext = useContext(AccountsContext);
    
    useEffect(() => {
        const initiData = async () => {
            const accounts = await fetchAccounts();
            accountsContext.dispatch({type: ACCOUNTS_ACTIONS.FETCH_ACCOUNTS, payload: accounts});
        }
        initiData();
    }, []);

    const addEaAccount = async (email: string) => {
        const [res, error] = await makeRequest({ method: RequestMethod.POST, url: ADD_ACCOUNT_ENDPOINT, body: { ea_account: email } });
        if (error) return { res: null, error};
        const newAcc: EaAccount = {
            owner: res.owner,
            email: email, 
            coinsEarned: 0, 
            filters: [],
            selectedFilter: null,
            status: EaAccountStatus.DISCONNECTED
        };
        accountsContext.dispatch({type: ACCOUNTS_ACTIONS.ADD_ACCOUNT, payload: { account: newAcc }});
        setOpen(false);
        return {res, error: null};
    }

    const deleteEaAccount = async (email: string) => {
        const [res, error] = await makeRequest({ method: RequestMethod.DELETE, url: `${DELETE_ACCOUNT_ENDPOINT}/${email}` });
        accountsContext.dispatch({type: ACCOUNTS_ACTIONS.DELETE_ACCOUNT, payload: { email }});
    }

    const fetchAccounts = async () => {
        const [data, error]  = await makeRequest({ url: ACCOUNTS_ENDPOINT });
        if (error) throw error;
        const accountsFetched = data.accounts;
        const eaAccounts: EaAccount[] = accountsFetched.map(acc => {
            return {
                owner: acc.owner,
                email: acc.email, 
                coinsEarned: acc.coins_earned, 
                filters: acc.search_filters,
                selectedFilter: acc.selected_search_filter,
                status: acc.status
            }
        })
        return eaAccounts;
    }
    
    return ( 
        <>
            <div className="manage-accounts-container">
                <div className="accounts-list">
                        { accountsContext.state.map((eac, index) =>
                            <AccountComp account={eac} key={index} onAccountDeleted={deleteEaAccount} />
                        )}
                </div>
                <div className="manage-accounts-more">
                    <AddCircleOutlineIcon className="add-account" fontSize="large" onClick={() => setOpen(true)}/>
                </div>
            </div>
            <Modal
                className='modal'
                open={isOpen}
                onClose={() => setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 200 }}
            >
                <div className='modal-form'>
                    <AddAccountModal addAccount={addEaAccount} />
                </div>
            </Modal>
        </>
    );
};

export default ManageAccounts;
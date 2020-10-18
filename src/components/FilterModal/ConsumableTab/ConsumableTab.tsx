import React, { FunctionComponent, useContext } from "react";
import CardSearch from "src/components/SearchCards/CardSearch";
import { AccountsContext, ACCOUNTS_ACTIONS } from "src/context/AccountsContext";
import ModalCombobox from "../ModalComboBox/ModalCombobox";

import { v4 as uuidv4 } from "uuid";
import { ConsumableFilter } from "src/interfaces/ConsumableFilter";
import FilterComboBox from "src/interfaces/FilterComboBox";

type ConsumableTabProps = {
  accountId: string;
  filter: ConsumableFilter | null;
  onFilterSet: Function;
};

const ConsumableTab: FunctionComponent<ConsumableTabProps> = ({
  accountId,
  filter,
  onFilterSet,
}) => {
  const accountsContext = useContext(AccountsContext);

  const comboBoxes = new Map<string, FilterComboBox>([
    ["Quality", new FilterComboBox("Quality", [], filter?.quality)],
    [
      "ChemistryType",
      new FilterComboBox("ChemistryType", [], filter?.chemType),
    ],
  ]);

  const updateSelectedValue = (name: string, value: string) => {
    const comboBox = comboBoxes.get(name);
    if (comboBox !== undefined) comboBox.selectedValue = value;
  };

  const setFilterHandler = () => {
    const filterId = filter == null ? uuidv4() : filter.id;
    const newFilter = new ConsumableFilter(
      filterId,
      comboBoxes.get("Quality")?.selectedValue,
      comboBoxes.get("ChemistryType")?.selectedValue
    );
    const actionType =
      filter === null
        ? ACCOUNTS_ACTIONS.ADD_ACCOUNT_FILTER
        : ACCOUNTS_ACTIONS.UPDATE_ACCOUNT_FILTER;
    accountsContext.dispatch({
      type: actionType,
      payload: { accountId, filter: newFilter },
    });
    onFilterSet();
  };

  return (
    <>
      <CardSearch />
      <div className="filter-row">
        <ModalCombobox
          comboBox={comboBoxes.get("Quality")}
          onValueChanged={updateSelectedValue}
        />
        <ModalCombobox
          comboBox={comboBoxes.get("ChemistryType")}
          onValueChanged={updateSelectedValue}
        />
      </div>
      <div className="filter-row"></div>
      <div className="filter-row last">
        <button onClick={setFilterHandler}>Set Filters</button>
      </div>
    </>
  );
};

export default ConsumableTab;

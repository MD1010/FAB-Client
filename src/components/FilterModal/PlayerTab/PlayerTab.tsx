import React, { FunctionComponent, useContext } from "react";
import CardSearch from "src/components/SearchCards/CardSearch";
import { AccountsContext, ACCOUNTS_ACTIONS } from "src/context/AccountsContext";
import { PlayerFilter } from "src/interfaces/PlayerFilter";
import ModalCombobox from "../ModalComboBox/ModalCombobox";

import { v4 as uuidv4 } from "uuid";
import FilterComboBox from "src/interfaces/FilterComboBox";
import { EntitiesContext } from "src/context/EntitiesContext";

type PlayerTabProps = {
  accountId: string;
  filter: PlayerFilter | null;
  onFilterSet: Function;
};

const PlayerTab: FunctionComponent<PlayerTabProps> = ({
  accountId,
  filter,
  onFilterSet,
}) => {
  const accountsContext = useContext(AccountsContext);
  const entitiesContext = useContext(EntitiesContext);

  const comboBoxes = new Map<string, FilterComboBox>([
    ["Position", new FilterComboBox("Position", [], filter?.position)],
    ["Quality", new FilterComboBox("Quality", [], filter?.quality)],
    [
      "Nation",
      new FilterComboBox("Nation", entitiesContext.nations, filter?.nation),
    ],
    [
      "League",
      new FilterComboBox("League", entitiesContext.leagues, filter?.league),
    ],
    ["Club", new FilterComboBox("Club", entitiesContext.teams, filter?.club)],
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
    const newFilter = new PlayerFilter(
      filterId,
      "",
      comboBoxes.get("Quality")?.selectedValue,
      comboBoxes.get("ChemistryType")?.selectedValue,
      comboBoxes.get("Position")?.selectedValue,
      comboBoxes.get("Nation")?.selectedValue,
      comboBoxes.get("League")?.selectedValue,
      comboBoxes.get("Club")?.selectedValue
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
      <div className="filter-row">
        <CardSearch />
      </div>
      <div className="filter-row">
        <ModalCombobox
          comboBox={comboBoxes.get("Position")}
          onValueChanged={updateSelectedValue}
        />
        <ModalCombobox
          comboBox={comboBoxes.get("Quality")}
          onValueChanged={updateSelectedValue}
        />
      </div>
      <div className="filter-row">
        <ModalCombobox
          comboBox={comboBoxes.get("Nation")}
          onValueChanged={updateSelectedValue}
        />
        <ModalCombobox
          comboBox={comboBoxes.get("League")}
          onValueChanged={updateSelectedValue}
        />
      </div>
      <div className="filter-row">
        <ModalCombobox
          comboBox={comboBoxes.get("Club")}
          onValueChanged={updateSelectedValue}
        />
        <ModalCombobox
          comboBox={comboBoxes.get("ChemistryType")}
          onValueChanged={updateSelectedValue}
        />
      </div>
      <div className="filter-row last">
        <button onClick={setFilterHandler}>Set Filters</button>
      </div>
    </>
  );
};

export default PlayerTab;

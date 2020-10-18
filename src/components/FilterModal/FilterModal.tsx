import React, { FunctionComponent, useState } from "react";

import "./FilterModal.css";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Filter, FilterTab } from "src/interfaces/Filter";
import PlayerTab from "./PlayerTab/PlayerTab";
import ConsumableTab from "./ConsumableTab/ConsumableTab";
import { PlayerFilter } from "src/interfaces/PlayerFilter";
import { ConsumableFilter } from "src/interfaces/ConsumableFilter";

type FilterModalProps = {
  accountId: string;
  filter: Filter | null;
  onFilterSet: Function;
};

const FilterModal: FunctionComponent<FilterModalProps> = ({
  accountId,
  filter,
  onFilterSet,
}) => {
  const [selectedTab, setSelectedTab] = useState(
    filter === null ? FilterTab.PLAYER : filter.type
  );

  const setFilterHandler = () => {
    onFilterSet();
  };

  return (
    <div className="filter-modal-container">
      <Tabs
        value={selectedTab}
        onChange={(e, newVal) => setSelectedTab(newVal)}
      >
        <Tab value={FilterTab.PLAYER} label="Player" />
        <Tab value={FilterTab.CONSUMABLE} label="Consumable" />
      </Tabs>
      <div
        className="player-containter"
        hidden={selectedTab === FilterTab.CONSUMABLE}
      >
        <PlayerTab
          accountId={accountId}
          filter={filter !== null ? (filter as PlayerFilter) : null}
          onFilterSet={setFilterHandler}
        />
      </div>
      <div
        className="consumable-containter"
        hidden={selectedTab === FilterTab.PLAYER}
      >
        <ConsumableTab
          accountId={accountId}
          filter={filter !== null ? (filter as ConsumableFilter) : null}
          onFilterSet={setFilterHandler}
        />
      </div>
    </div>
  );
};

export default FilterModal;

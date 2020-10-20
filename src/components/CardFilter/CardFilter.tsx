import Modal from "@material-ui/core/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, {
  CSSProperties,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { AccountsContext, ACCOUNTS_ACTIONS } from "src/context/AccountsContext";
import { ConsumableFilter } from "src/interfaces/ConsumableFilter";
import { Filter } from "src/interfaces/Filter";
import { PlayerFilter } from "src/interfaces/PlayerFilter";
import FilterModal from "../FilterModal/FilterModal";
import "./CardFilter.css";

type CardFilterProps = {
  accountId: string;
  filter: Filter;
  isChosen: boolean;
  onFilterChosen: Function;
};

const CardFilter: FunctionComponent<CardFilterProps> = ({
  accountId,
  filter,
  isChosen,
  onFilterChosen,
}) => {
  const [isRunnable, setRunnable] = useState(isChosen);
  const [isfilterEditOpen, setIsfilterEditOpen] = useState(false);
  const [isFilterOptionsShown, setIsFilterOptionsShown] = useState(false);

  const accountsContext = useContext(AccountsContext);
  useEffect(() => {
    setRunnable(isChosen);
  }, [isChosen]);

  const deleteFilter = () => {
    accountsContext.dispatch({
      type: ACCOUNTS_ACTIONS.DELETE_ACCOUNT_FILTER,
      payload: { accountId, filterId: filter.id },
    });
  };

  const cardFilterStyle: CSSProperties = {
    backgroundColor: "#191931",
    color: "rgb(99, 211, 249)",
    display: "flex",
    flexDirection: "column",
    boxShadow: `0px ${isRunnable ? "-10px" : "0px"} 1px ${
      isRunnable ? "green" : "gray"
    }`,
    borderRadius: "5px",
    margin: "10px",
  };

  const filterMoreStyle: CSSProperties = {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(115, 115, 115, 0.7)",
    zIndex: 100,
    width: "inherit",
    height: "inherit",
    cursor: "pointer",
    borderRadius: "inherit",
    visibility: isFilterOptionsShown ? "visible" : "hidden",
  };

  const cardChosen = () => {
    onFilterChosen(filter.id);
  };

  const PlayerFilterData = () => {
    const playerFilter = filter as PlayerFilter;
    return (
      <>
        <span> Name: {playerFilter.name}</span>
        <span> Quality: {playerFilter.quality}</span>
        <span> Chemistry Type: {playerFilter.chemType}</span>
        <span> Position: {playerFilter.position}</span>
        <span> Nation: {playerFilter.nation}</span>
        <span> League: {playerFilter.league}</span>
        <span> Club: {playerFilter.club}</span>
      </>
    );
  };

  const ConsumableFilterData = () => {
    const consumableFilter = filter as ConsumableFilter;
    return (
      <>
        <span> Name: {"name"}</span>
        <span> Quality: {consumableFilter.quality}</span>
        <span> Chemistry Type: {consumableFilter.chemType}</span>
      </>
    );
  };

  return (
    <>
      {isfilterEditOpen ? (
        <Modal
          open={isfilterEditOpen}
          onClose={() => setIsfilterEditOpen(false)}
        >
          <>
            <FilterModal
              filter={filter}
              accountId={accountId}
              onFilterSet={() => setIsfilterEditOpen(false)}
            />
          </>
        </Modal>
      ) : null}
      <div
        style={cardFilterStyle}
        className="filter-container"
        onMouseEnter={(e) => setIsFilterOptionsShown(true)}
        onMouseLeave={(e) => setIsFilterOptionsShown(false)}
      >
        <div
          style={filterMoreStyle}
          className="filter-more"
          onClick={cardChosen}
        >
          <EditIcon
            className="click-icon edit"
            onClick={() => setIsfilterEditOpen(true)}
          />
          <DeleteIcon className="click-icon remove" onClick={deleteFilter} />
        </div>
        <div className="filter-details">
          {filter instanceof PlayerFilter
            ? PlayerFilterData()
            : ConsumableFilterData()}
        </div>
      </div>
    </>
  );
};

export default CardFilter;

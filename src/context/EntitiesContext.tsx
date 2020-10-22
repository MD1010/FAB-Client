import React, { FC, useEffect, useState } from "react";
import { makeRequest } from "src/services/request";
import {
  LEAGUES_ENDPOINT,
  NATIONS_ENDPOINT,
  TEAMS_ENDPOINT,
} from "src/consts/endpoints";

export const EntitiesContext = React.createContext({
  nations: [],
  teams: [],
  leagues: [],
});

const EntitiesContextProvider: FC = (props) => {
  const [entities, setEntities] = useState({
    nations: [],
    teams: [],
    leagues: [],
  });

  const fetchNations = async () => {
    const [data, error] = await makeRequest({ url: `${NATIONS_ENDPOINT}` });
    if (error) throw error;
    return data;
  };

  const fetchTeams = async () => {
    const [data, error] = await makeRequest({ url: `${TEAMS_ENDPOINT}` });
    if (error) throw error;
    return data;
  };

  const fetchLeagues = async () => {
    const [data, error] = await makeRequest({ url: `${LEAGUES_ENDPOINT}` });
    if (error) throw error;
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const nations = await fetchNations();
      const teams = await fetchTeams();
      const leagues = await fetchLeagues();
      setEntities({ nations, teams, leagues });
    };

    fetchData();
  }, []);

  return (
    <EntitiesContext.Provider
      value={{
        nations: entities.nations,
        teams: entities.teams,
        leagues: entities.leagues,
      }}
    >
      {props.children}
    </EntitiesContext.Provider>
  );
};

export default EntitiesContextProvider;

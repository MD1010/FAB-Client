import React, { FunctionComponent, useState } from 'react';

import './CardFilters.css';
import CardFilter from '../CardFilter/CardFilter';
import { Filter }  from 'src/interfaces/Filter';


type CardFiltersProps = {
    accountId: string,
    filters: Filter[],
    lastChosenFilter: string
}

const CardFilters: FunctionComponent<CardFiltersProps>  = ({ accountId, filters, lastChosenFilter }) => {
    const [chosenFilter, setChosenFilter] = useState(lastChosenFilter);

    const onFilterChosenHandler = (filterId: string) => {
        setChosenFilter(filterId);
    }

    return (
        <div className="filters-container">
            { filters.map(filter => <CardFilter key={filter.id}
                                                filter={filter} 
                                                accountId={accountId} 
                                                isChosen={chosenFilter === filter.id}
                                                onFilterChosen={onFilterChosenHandler} />)}
        </div>
    );
};

export default CardFilters;
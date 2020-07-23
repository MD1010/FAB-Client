import { AutoComplete } from 'antd';
import { debounce } from 'lodash';
import React, { FC, useState } from 'react';

const onSelect = (data: any) => {
	console.log('onSelect', data);
};
const CardSearch: FC = () => {
	const myOptions = [{ value: 'Burns Bay Road' }, { value: 'Downing Street' }, { value: 'Wall Street' }];
	const [options, setOptions] = useState(myOptions);
	const [value, setValue] = useState('');

	const filterCards = (searchText: string) => {
		const filtered = myOptions.filter(
			(option: { value: string }) => option.value.toUpperCase().indexOf(searchText.toUpperCase()) !== -1
		);
		setOptions(filtered);
	};

	return (
		<AutoComplete
			autoFocus
			style={{ width: '200px' }}
			options={options}
			onSelect={onSelect}
			onSearch={debounce(filterCards, 500)}
			placeholder='input here'
		/>
	);
};

export default CardSearch;

import { AutoComplete } from 'antd';
import axios from 'axios';
import { debounce, find } from 'lodash';
import React, { FC, useState } from 'react';
import { CARDS_ENDPOINT } from 'src/consts/endpoints';
import { UTCard } from 'src/interfaces/UTCard';
import { Container } from 'src/styles/common/Container';

const CardSearch: FC = () => {
  console.log(1);
  const [options, setOptions] = useState<UTCard[]>([]);
  // const [selectedValue, setSelectedValue] = useState<string | undefined>('');
  const [textInput, setText] = useState<string | undefined>('');
  const { Option } = AutoComplete;
  const onSelect = (id: string) => {
    let selected = find(options, (card: UTCard) => card.id === +id)?.name;
    setText(selected);
    // setSelectedValue(selected);
    setOptions([]);
  };
  const searchCard = debounce(async (playerName: string) => {
    if (playerName.length > 2) {
      try {
        const { data } = await axios.get(`${CARDS_ENDPOINT}`, { params: { term: playerName } });
        setOptions(data);
      } catch (err) {
        throw err;
      }
    }
  }, 400);

  return (
    <Container>
      <AutoComplete
        open={options.length > 0}
        autoFocus
        filterOption={false}
        style={{ width: '50vw' }}
        onSelect={(selected: string) => onSelect(selected)}
        onChange={(playerName) => searchCard(playerName)}
      >
        {options.map((card: UTCard) => (
          <Option key={card.id} value={card.id.toString()}>
            <div>{card.name}</div>
            <div>{card.rating}</div>
            <div>{card.id}</div>
          </Option>
        ))}
      </AutoComplete>
    </Container>
  );
  // const [result, setResult] = useState([]);

  // const handleSearch = (value) => {
  //   let res: any = [];

  //   if (!value || value.indexOf('@') >= 0) {
  //     res = [];
  //   } else {
  //     res = [{ name: 'gmail.com' }, { name: '163.com' }, { name: 'qq.com' }].map((domain) => `${value}@${domain.name}`);
  //   }

  //   setResult(res);
  // };

  // return (
  //   <AutoComplete
  //     style={{
  //       width: 200,
  //     }}
  //     onSearch={handleSearch}
  //     placeholder='input here'
  //   >
  //     {...result.map((email) => (
  //       <Option key={email} value={email}>
  //         {email}
  //       </Option>
  //     ))}
  //   </AutoComplete>
  // );
};
export default CardSearch;

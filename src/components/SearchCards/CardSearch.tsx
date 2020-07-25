import { AutoComplete } from 'antd';
import axios from 'axios';
import { debounce } from 'lodash';
import React, { FC, useState } from 'react';
import { CARDS_ENDPOINT } from 'src/consts/endpoints';
import { UTCard } from 'src/interfaces/UTCard';
import { Container } from 'src/styles/common/Container';

const CardSearch: FC = () => {
  const [options, setOptions] = useState<UTCard[]>([]);
  // const [searchedText, setSearchedText] = useState('');

  const onSelect = (data: any) => {
    console.log('onSelect', data);
  };
  const searchCard = debounce(async (playerName: string) => {
    if (playerName.length > 2) {
      try {
        const { data } = await axios.get(`${CARDS_ENDPOINT}/${playerName}`);
        setOptions(data);
      } catch (err) {
        throw err;
      }
    }
  }, 500);
  const { Option } = AutoComplete;
  return (
    <Container>
      <AutoComplete
        autoFocus
        style={{ width: '50vw' }}
        onSelect={onSelect}
        onChange={(playerName) => searchCard(playerName)}
        {...options.map((card: UTCard) => (
          <Option key={card.id} value={card.name}>
            <div>asdasd</div>
          </Option>
        ))}
      />
    </Container>
  );
};
export default CardSearch;

import { AutoComplete } from 'antd';
import axios from 'axios';
import { debounce } from 'lodash';
import React, { FC, useState } from 'react';
import { CARDS_ENDPOINT } from 'src/consts/endpoints';
import { UTCard } from 'src/interfaces/UTCard';
import { Container } from 'src/styles/common/Container';

const CardSearch: FC = () => {
  const [options, setOptions] = useState<UTCard[]>([]);
  const [isOpen, setOpen] = useState<boolean>(true);
  const [searchedText, setSearchedText] = useState<string>('');
  const { Option } = AutoComplete;

  const onSelect = (id: string) => {
    setOpen(false);
  };

  const searchCard = debounce(async (playerName: string) => {
    setSearchedText(playerName);
    if (playerName?.length > 2) {
      try {
        const { data } = await axios.get(`${CARDS_ENDPOINT}`, { params: { term: playerName } });
        setOptions(data);
        data.length > 0 ? setOpen(true) : setOpen(false);
      } catch (err) {
        throw err;
      }
    } else {
      setOpen(false);
    }
  }, 500);

  const getLongestCardNameSubstring = (cardName: string) => {
    let firstAppearnce = cardName.toLowerCase().indexOf(searchedText.toLowerCase());
    if (cardName.length > 2 && firstAppearnce !== -1) {
      return [firstAppearnce, firstAppearnce + searchedText.length];
    }
    return [-1, -1];
  };

  return (
    <Container>
      <AutoComplete
        placeholder='Search for FIFA 20 Player...'
        allowClear
        open={isOpen}
        autoFocus
        onBlur={() => setOpen(false)}
        filterOption={false}
        style={{ width: '50vw' }}
        onSelect={(selected: string) => onSelect(selected)}
        onChange={(playerName) => searchCard(playerName)}
      >
        {options.map((card: UTCard) => (
          <Option key={card.id} value={card.name}>
            <div>
              {[...card.name].map((letter, index) =>
                index >= getLongestCardNameSubstring(card.name)[0] && index < getLongestCardNameSubstring(card.name)[1] ? (
                  <b>{letter}</b>
                ) : (
                  letter
                )
              )}
            </div>
            <div>{card.rating}</div>
            <div>{card.id}</div>
          </Option>
        ))}
      </AutoComplete>
    </Container>
  );
};
export default CardSearch;

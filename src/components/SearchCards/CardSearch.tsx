import { AutoComplete } from 'antd';
import axios from 'axios';
import { debounce, find } from 'lodash';
import React, { FC, useState } from 'react';
import { CARDS_ENDPOINT } from 'src/consts/endpoints';
import { UTCard } from 'src/interfaces/UTCard';
import { Container } from 'src/styles/common/Container';
import { Spinner } from '../common/LoadingSpinner';
import { DataSourceItemType } from 'antd/lib/auto-complete';
import { Flex } from 'src/styles/common/Flex';

const CardSearch: FC = () => {
  const [options, setOptions] = useState<UTCard[]>([]);
  const [isOpen, setOpen] = useState<boolean>(true);
  const [searchedText, setSearchedText] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const { Option } = AutoComplete;

  const onSelect = (id: any, sec) => {
    console.log(id);
    console.log(sec);
    setOpen(false);
  };

  const searchCard = debounce(async (playerName: string) => {
    setSearchedText(playerName);
    if (playerName?.length > 2) {
      try {
        setLoading(true);
        const { data } = await axios.get(`${CARDS_ENDPOINT}`, { params: { term: playerName } });
        setLoading(false);
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
    let firstAppearnce = cardName?.toLowerCase().indexOf(searchedText?.toLowerCase());
    if (cardName.length > 2 && firstAppearnce !== -1) {
      return [firstAppearnce, firstAppearnce + searchedText.length];
    }
    return [-1, -1];
  };

  // const getCardNameById = (id: number): string => {
  //   let resultToDisplay = find(options, (option) => option.id === id);
  //   return resultToDisplay ? resultToDisplay.name : '';
  // };

  return (
    <Flex>
      <Container>
        <AutoComplete
          placeholder='Search for FIFA 20 Player...'
          allowClear
          open={isOpen}
          autoFocus
          onBlur={() => setOpen(false)}
          filterOption={false}
          style={{ width: '50vw' }}
          onSelect={(selected: string, sec) => onSelect(selected, sec)}
          onSearch={(playerName) => searchCard(playerName)}
        >
          {console.log(options)}
          {options.map((card: UTCard) => (
            <Option key={card.id} value={card.id.toString()}>
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
      <Container>{isLoading ? <Spinner /> : null}</Container>
    </Flex>
  );
};
export default CardSearch;

import { CircularProgress, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { debounce } from 'lodash';
import React, { FC, useEffect, useRef, useState } from 'react';
import { CARDS_ENDPOINT } from 'src/consts/endpoints';
import { UTCard } from 'src/interfaces/UTCard';
import { Container } from 'src/styles/common/Container';
import { Flex } from 'src/styles/common/Flex';
import { Image } from 'src/styles/common/Image';
import { makeRequest } from '../common/makeRequest';
import { CardResult } from './styles/CardResult.style';
import { RatingSquare } from './styles/RatingSquare.style';

const CardSearch: FC = () => {
  const [options, setOptions] = useState<UTCard[]>([]);
  const [isOpen, setOpen] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchedText, setSearchedText] = useState<string>('');
  const isSelected = useRef(false);

  const onChange = (selectedCard) => {
    console.log(selectedCard);
    setOpen(false);
    isSelected.current = true;
  };

  useEffect(() => {
    options.length ? setOpen(true) : setOpen(false);
  }, [options]);

  useEffect(() => {
    isSelected.current = false;
  }, [searchedText]);

  const searchCard = debounce(async (val) => {
    setSearchedText(val);
    if (val?.length > 2 && !isSelected.current) {
      setLoading(true);
      const [data, error] = await makeRequest({ url: `${CARDS_ENDPOINT}`, params: { term: val } });
      if (error) throw error;
      setLoading(false);
      setOptions(data);
    } else {
      setOpen(false);
    }
  }, 500);

  const getLongestCardNameSubstring = (cardName: string) => {
    let firstAppearnce = cardName?.toLowerCase().indexOf(searchedText?.toLowerCase());
    if (cardName.length > 2 && firstAppearnce !== -1) {
      return [firstAppearnce, firstAppearnce + searchedText.length];
    }
    return [];
  };

  return (
    <Flex>
      <Container>
        <Autocomplete
          options={options}
          freeSolo
          fullWidth
          selectOnFocus
          handleHomeEndKeys
          open={isOpen}
          noOptionsText={false}
          getOptionLabel={(option) => `${option.name} (${option.rating})`}
          style={{ width: 500, padding: 10 }}
          spellCheck={false}
          onChange={(e, selectedCard) => onChange(selectedCard)}
          onInputChange={(e, val) => {
            if (!val) {
              setOpen(false);
            }
            searchCard(val);
          }}
          renderOption={(card: UTCard) => (
            <>
              <CardResult>
                <Image className='club' src={card.clubImage} width={25} height={25} style={{ marginRight: '5px' }} />
                <Image className='nat' src={card.nationImage} width={25} height={20} style={{ marginRight: '5px' }} />
                <Image className='nat' src={card.playerImage} width={40} height={40} style={{ marginRight: '5px' }} />

                <div className='name' style={{ display: 'flex', flex: 1 }}>
                  <span>
                    {[...card.name].map((letter, index) =>
                      index >= getLongestCardNameSubstring(card.name)[0] && index < getLongestCardNameSubstring(card.name)[1] ? (
                        <b key={index}>{letter}</b>
                      ) : (
                        letter
                      )
                    )}
                  </span>
                  <div
                    className='pos'
                    style={{
                      marginLeft: '2px',
                      fontSize: '10px',
                      color: 'rgb(172, 165, 154)',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    ({card.position})
                  </div>
                </div>

                <div style={{ fontSize: '0.65em', color: 'rgb(172, 165, 154)' }} className='rev'>
                  {card.revision.toUpperCase()}
                </div>
                {console.log()}
                <RatingSquare>{card.rating}</RatingSquare>
              </CardResult>
            </>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder='Select Card To Search'
              label='Card To Search'
              margin='normal'
              variant='outlined'
              InputLabelProps={{ shrink: true }}
              InputProps={{
                ...params.InputProps,

                endAdornment: (
                  <>
                    {isLoading ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Container>
    </Flex>
  );
};
export default CardSearch;

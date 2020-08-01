import { CircularProgress, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { debounce } from 'lodash';
import React, { FC, useEffect, useRef, useState } from 'react';
import { CARDS_ENDPOINT } from 'src/consts/endpoints';
import { UTCard } from 'src/interfaces/UTCard';
import { Container } from 'src/styles/common/Container';
import { Flex } from 'src/styles/common/Flex';
import { makeRequest } from '../common/makeRequest';
import { CardImage, CardPosition, CardResult, CardRevision, useStyles, RatingSquare } from './CardResult.style';

const CardSearch: FC = () => {
  const [options, setOptions] = useState<UTCard[]>([]);
  const [isOpen, setOpen] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchedText, setSearchedText] = useState<string | null>(null);
  const isSelected = useRef(false);
  const classes = useStyles();

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
    let name = cardName.trim();
    if (searchedText) {
      let firstAppearnce = name?.toLowerCase().indexOf(searchedText.toLowerCase());
      if (name.length > 2 && firstAppearnce !== -1) {
        return [firstAppearnce, firstAppearnce + searchedText.length];
      }
    }

    return [];
  };

  return (
    <Flex>
      <Container>
        <Autocomplete
          classes={classes}
          options={options}
          fullWidth
          selectOnFocus
          handleHomeEndKeys
          filterOptions={(option, state) => option}
          open={isOpen}
          onBlur={() => setOptions([])}
          onClose={() => setOpen(false)}
          onOpen={() => !isOpen && options.length && searchedText?.trim() && searchedText.trim().length > 2 && setOpen(true)}
          noOptionsText={false}
          getOptionLabel={(option) => `${option.name} (${option.rating})`}
          style={{ width: 500, padding: 10 }}
          spellCheck={false}
          onChange={(e, selectedCard) => onChange(selectedCard)}
          onInputChange={(e, val) => {
            val = val.trim();
            if (!val || val.length < 3) {
              setOpen(false);
            }
            searchCard(val);
          }}
          renderOption={(card: UTCard) => (
            <>
              <CardResult>
                <CardImage src={card.clubImage} />
                <CardImage src={card.nationImage} />
                <CardImage src={card.playerImage} width={40} height={40} />

                <Flex justifyStart className='card-name'>
                  <span>
                    {[...card.name].map((letter, index) =>
                      index >= getLongestCardNameSubstring(card.name)[0] && index < getLongestCardNameSubstring(card.name)[1] ? (
                        <b key={index}>{letter}</b>
                      ) : (
                        letter
                      )
                    )}
                  </span>
                  <CardPosition>({card.position})</CardPosition>
                </Flex>

                <CardRevision>{card.revision.toUpperCase()}</CardRevision>
                {card.revision ? <RatingSquare revision={card.revision}>{card.rating}</RatingSquare> : null}
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

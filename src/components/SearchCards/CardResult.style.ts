import { makeStyles } from '@material-ui/core';
import { Flex } from 'src/styles/common/Flex';
import styled from 'styled-components';
import { revisionColors } from 'src/consts/RevisionCards';

export const CardResult = styled(Flex)`
  justify-content: flex-start;
`;
export const CardImage = styled.img`
  margin-right: 5px;
  width: ${(props) => props.width || '25px'};
`;

export const CardPosition = styled.div`
  margin-left: 2px;
  font-size: 10px;
  color: rgb(172, 165, 154);
  display: grid;
  place-items: center;
`;

export const CardRevision = styled.div`
  font-size: 0.65em;
  color: rgb(172, 165, 154);
`;

export const useStyles = makeStyles(() => ({
  option: {
    '&.MuiAutocomplete-option:hover .card-name': {
      color: '#007bff',
    },
  },
}));

export const RatingSquare = styled.div`
  border-radius: 50%;
  width: 1.9em;
  height: 1.9em;
  display: grid;
  font-weight: bold;
  margin-left: 4px;
  place-content: center;
  // TODO : fill the colors in the next year
  /* background: ${(props: { revision: string }) =>
    props.revision && revisionColors[props.revision.toLowerCase()]?.background}; */
  /* color: ${(props: { revision: string }) => props.revision && revisionColors[props.revision.toLowerCase()]?.foreground}; */
`;

import { revisionColors } from './CardRevisionColors.style';
import styled from 'styled-components';
import { CardRevisionColorEnum } from 'src/types/CardRevisionColor';
interface RatingSquareProps {
  revision?: string;
}
export const RatingSquare = styled.div<RatingSquareProps>`
  padding: 4px;
  border-radius: 15px;
  /* color: rgb(232, 230, 227); */
  /* color: ${(props) => props.revision}; */
  width: 2em;
  display: grid;
  font-weight:bold;
  font-size:1.2em;
  place-content: center;
   background-color: initial; 
`;

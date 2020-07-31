import { revisionColors } from './CardRevisionColors.style';
import styled from 'styled-components';
import { CardRevisionColorEnum } from 'src/types/CardRevisionColor';
interface RatingSquareProps {
  revision: string;
}
export const RatingSquare = styled.div<RatingSquareProps>`
  padding: 4px;
  border-radius: 15px;
  color: rgb(232, 230, 227);
  width: 2em;
  display: grid;
  place-content: center;
  background-color: initial;
  background-image: ${(props: RatingSquareProps) => revisionColors[CardRevisionColorEnum['NIF']]['backgroundImage']};
  border-top-color: ${(props: RatingSquareProps) => revisionColors[CardRevisionColorEnum[props.revision]]};
  border-right-color: ${(props: RatingSquareProps) => revisionColors[CardRevisionColorEnum[props.revision]]};
  border-bottom-color: ${(props: RatingSquareProps) => revisionColors[CardRevisionColorEnum[props.revision]]};
  border-left-color: ${(props: RatingSquareProps) => revisionColors[CardRevisionColorEnum[props.revision]]};
`;

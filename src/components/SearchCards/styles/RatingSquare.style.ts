import { revisionColors } from '../../../consts/RevisionCards';
import styled from 'styled-components';

interface RatingSquareProps {
  revision?: string;
}
export const RatingSquare = styled.div`
  border-radius: 50%;
  width: 1.9em;
  height: 1.9em;
  display: grid;
  font-weight: bold;
  margin-left: 4px;
  border:1px dashed black;
  place-content: center;
  // TODO : fill the colors in the next year
  /* background: ${(props: RatingSquareProps) => props.revision && revisionColors[props.revision.toLowerCase()]?.background}; */
  /* color: ${(props: RatingSquareProps) => props.revision && revisionColors[props.revision.toLowerCase()]?.foreground}; */
`;

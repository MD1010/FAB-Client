import styled from 'styled-components';
interface FlexProps {
  justifyEnd?: boolean;
  justifyStart?: boolean;
}
export const Flex = styled.div`
  display: flex;
  justify-content: ${(props: FlexProps) => (props.justifyStart ? 'flex-start' : props.justifyEnd ? 'flex-end' : 'center')};
  align-items: center;
  flex: 1;
`;

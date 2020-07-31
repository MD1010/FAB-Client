import styled from 'styled-components';
interface FlexProps {
  position?: string;
}
export const Flex = styled.div`
  display: flex;
  justify-content: ${(props: FlexProps) => props.position || 'center'};
  align-items: center;
  flex: 1;
`;

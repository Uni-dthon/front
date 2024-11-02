import styled from 'styled-components';
import CalendarUI from './CalendarUI';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export default function CalendarPage() {
  return (
    <Wrapper>
      <CalendarUI />
    </Wrapper>
  )
}
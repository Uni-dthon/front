import styled from 'styled-components';
import calendIcon from './images/calendarIcon.csv'
import dashIcon from './images/dashboardIcon.csv'

const Wrapper = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  position: absolute;
  bottom: 0;
  align-items: center;
`

const calendarIcon = styled.div`  
  background-image: url(${calendIcon});
  width: 15px;
  height: 15px;
`

const dashboardIcon = styled.div`
  background-image: url(${dashIcon});
  width: 15px;
  height: 15px;
`

const BottomNav = () => {
  return (
    <Wrapper>
      <calendarIcon />
      <dashboardIcon />
    </Wrapper>
  );
};

export default BottomNav;
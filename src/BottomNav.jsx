import styled from 'styled-components';
import calendIcon from './images/calendarIcon.svg'
import dashIcon from './images/dashboardIcon.svg'
import {useNavigate} from "react-router-dom";

const Wrapper = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: center;
    position: fixed;
    left: 0;
    bottom: -1px;
    align-items: center;
    background-color: var(--darkgrey-color);
`

const Imgbox = styled.div`
    border-top: 2px solid white;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: ${({isActive}) => (isActive ? "2px solid white" : "none")};
`

const BottomNav = ({toggle}) => {
  const navigate = useNavigate();

  const goToCalendar = async () => {
    navigate("/calendar");
  };
  const goToDashboard = async () => {
    navigate("/dashboard")
  }

  return (
    <div>
      <div style={{height: "15vh"}}/>
      <Wrapper>
        <Imgbox isActive={toggle} onClick={goToCalendar}>
          <img src={calendIcon} alt="calendarIcon" style={{width: "2rem", height: "2rem", marginLeft: "1rem"}}/>
        </Imgbox>
        <Imgbox isActive={!toggle} onClick={goToDashboard}>
          <img src={dashIcon} alt="dashboardIcon" style={{width: "2rem", height: "2rem", marginLeft: "1rem"}}/>
        </Imgbox>
      </Wrapper>
    </div>
  )
};

export default BottomNav;
import styled from "styled-components";
import Onboarding from './images/onboarding.svg';
import {Link} from "react-router-dom";


export default function Start() {

  return (
    <Container>
      <Info>
        <Text>
          바쁜 일상 속 <br/>
          고민 거리 줄여주는 <HighlightText>미리사</HighlightText>
        </Text>
        <ImageContainer>
          <img src={Onboarding} width={166} height={448} alt="Onboarding"/>
        </ImageContainer>
      </Info>

      <Footer>
        <Link to={"/login"} style={{textDecoration: "none"}}>
          <StartText>시작하기</StartText>
        </Link>
      </Footer>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;
`;

const Info = styled.div`
    flex: none;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Text = styled.p`
    font-size: 23px;
    font-weight: 800;
    font-family: Pretendard-SemiBold;
    line-height: 1.3;
    text-align: center;
    color: white;
`;

const HighlightText = styled.span`
    color: var(--red-color);
    font-family: Pretendard-Black;
    font-size: 25px;
`;

const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
`;

const Footer = styled.div`
    background-color: var(--red-color);
    width: 335px;
    height: 61px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 30px;
    border-radius: 2vh;
`;

const StartText = styled.p`
    font-size: 18px;
    font-weight: 600;
    color: white;
    margin: 0;
`;

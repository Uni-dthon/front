import styled from "styled-components";
import Onboarding from './images/onboarding.svg';


export default function Start() {

  return (
    <Container>
      <Info>
        <Text>
          메인 화면에서 <br/>
          볼 수 있는 <HighlightText>안전 구역</HighlightText>
        </Text>
        <ImageContainer>
          <img src={Onboarding} width={166} height={448} alt="Onboarding"/>
        </ImageContainer>
      </Info>

      <Footer>
        <StartText>시작하기</StartText>
      </Footer>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding-top: 120px;
    height: 100vh;
`;

const Info = styled.div`
    flex: none;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Text = styled.p`
    font-size: 23px;
    font-weight: 600;
    line-height: 1.3;
    text-align: center;
`;

const HighlightText = styled.span`
    color: var(--red-color);
`;

const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
`;

const Footer = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 -5px 6px rgba(75, 0, 130, 0.3);
    position: fixed;
    bottom: 0;
    cursor: pointer;
`;

const StartText = styled.p`
    font-size: 18px;
    font-weight: 600;
    color: white;
    margin: 0;
`;

import {useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import Logo from "./images/logo.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginBtn = () => {
    console.log("Email: ", email);
    console.log("Password: ", password);
  }

  return (
    <Container>
      <LoginLogoBox>
        <img src={Logo} width={136} height={163} alt="Logo"/>
      </LoginLogoBox>
      <Form>
        <InputContainer>
          <InputTitle>이메일 주소</InputTitle>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="아이디를 입력해주세요"
            value={email}
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>비밀번호</InputTitle>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
            value={password}
          />
        </InputContainer>
        <ButtonContainer>
          <LoginButton onClick={loginBtn} disabled={!(email && password)}>
            로그인
          </LoginButton>
        </ButtonContainer>
      </Form>
      <BottomLinks>
        <StyledLink to="/">이메일 가입</StyledLink>
        <Separator>|</Separator>
        <StyledLink to="/">이메일 찾기</StyledLink>
        <Separator>|</Separator>
        <StyledLink to="/">비밀번호 찾기</StyledLink>
      </BottomLinks>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LoginLogoBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 130px;
    margin-bottom: 40px;
`;

const Form = styled.div`
    width: 328px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    &:focus{
      border: none;
      outline: none;
    }
`;

const InputTitle = styled.label`
    color: white;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 10px;
`;

const Input = styled.input`
    padding: 13px 12px;
    border-radius: 12px;
    border: 1px solid #dadfe5;
    font-size: 16px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 50px;
`;

const LoginButton = styled.button`
    background-color: var(--red-color);
    height: 50px;
    color: white;
    font-size: 16px;
    font-weight: 600;
    padding: 12px 0;
    border-radius: 12px;
    border: none;
    cursor: pointer;

    &:disabled {
        background-color: #c5ccd7;
        cursor: not-allowed;
    }
`;

const BottomLinks = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 30px;
    color: #b9c0cc;
`;

const StyledLink = styled(Link)`
    color: #b9c0cc;
    text-decoration: none;
`;

const Separator = styled.span`
    color: #b9c0cc;
`;

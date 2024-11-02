import styled, {keyframes} from "styled-components";
import {useNavigate} from "react-router-dom";
import upload from "../images/upload.svg";
import add from "../images/add.svg";
import camera from "../images/camera.svg";
import uploadBtn from "../images/uploadBtn.svg";

export default function UploadBtn({handleClick, isVisible}) {

  const navigate = useNavigate();

  const goToReceiptDirect = async () => {
    navigate("/receiptdirect");
  };

  return (
    <Container>
      <ElementsContainer>
        {isVisible && (
          <>
            <Element onClick={goToReceiptDirect}>
              <ChildContainer>
                <div>직접 추가</div>
                <img src={add} alt="add"/>
              </ChildContainer>
            </Element>
            <Element>
              <ChildContainer>
                <div >영수증 촬영</div>
                <img src={camera} alt="add"/>
              </ChildContainer>
            </Element>
            <Element>
              <ChildContainer>
                <div>영수증 업로드</div>
                <img src={uploadBtn} alt="add"/>
              </ChildContainer>
            </Element>
          </>
        )}
      </ElementsContainer>
      <Button onClick={handleClick}>
        <img src={upload} alt="upload"/>
      </Button>
    </Container>
  );
}

const slideUp = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const Container = styled.div`
    text-align: end;
`

const Button = styled.button`
    all: unset;
`

const ElementsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 35px;
`;

const Element = styled.div`
    opacity: 0;
    animation: ${slideUp} 0.5s forwards;
    border-radius: 5px;
    font-size: 18px;
`;

const ChildContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    color: white;
    font-family: Pretendard-regular;
`;
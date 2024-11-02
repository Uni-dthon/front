import styled from "styled-components";
import {useState} from "react";

export default function ItemBox({name, price, count, setModalVisible}) {
  const [addVisible, setAddVisible] = useState(false);
  const [countNum, setCountNum] = useState(count);

  const handleOpenClick = () => {
    setAddVisible(true);
    setModalVisible(true);
  };

  const handleUseClick = () => {
    setAddVisible(false);
    setModalVisible(false);
    setCountNum(countNum - 1);
  };

  const handleClose = () => {
    setAddVisible(false);
    setModalVisible(false);
  };

  return (
    <div style={{display: "flex", gap: "6px"}}>
      {addVisible && (
        <AddContainer>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px"}}>
            <AddText>
              <ItemName>{name}</ItemName>
              를 사용하시나요?
            </AddText>
            <Count>현재 : {countNum}개</Count>
          </div>
          <div style={{display: "flex", gap: "10px", justifyContent: "flex-end"}}>
            <UseBtn onClick={handleUseClick}>사용</UseBtn>
            <CancelBtn onClick={handleClose}>취소</CancelBtn>
          </div>
        </AddContainer>
      )}

      <Container>
        <div style={{display: "flex", gap: "10px"}}>
          <div>{name}</div>
          <div>{price}</div>
        </div>
        <div>{countNum}</div>
      </Container>
      <AddBtn onClick={() => setCountNum(countNum + 1)}>추가</AddBtn>
      <DelBtn onClick={handleOpenClick}>사용</DelBtn>
    </div>
  );
}

const AddContainer = styled.div`
    position: fixed;
    top: 303px;
    left: 44px;
    width: 269px;
    height: 132px;
    background-color: var(--darkgrey-color);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    z-index: 100;
`;

const AddText = styled.div`
    display: flex;
    font-family: Pretendard-SemiBold;
    margin-top: 20px;
    margin-bottom: 10px;
    color: white;
`;

const ItemName = styled.div`
    font-family: Pretendard-regular;
    color: var(--red-color);
    font-weight: 600;
`;

const Count = styled.div`
    color: var(--lightgrey-color);
`;

const Container = styled.div`
    width: 218px;
    border-radius: 10px;
    background-color: var(--darkgrey-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    gap: 20px;
    color: var(--lightgrey-color);
    font-size: 16px;
    font-family: Pretendard-SemiBold;
`;

const AddBtn = styled.button`
    all: unset;
    text-align: center;
    width: 51px;
    height: 40px;
    border-radius: 8px;
    background-color: var(--darkgrey-color);
    color: var(--lightgrey-color);
    font-family: Pretendard-SemiBold;
`;

const DelBtn = styled.button`
    all: unset;
    text-align: center;
    width: 51px;
    height: 40px;
    border-radius: 8px;
    background-color: var(--red-color);
    color: white;
    font-family: Pretendard-SemiBold;
`;

const UseBtn = styled.div`
    color: white;
    background-color: var(--red-color);
    border-radius: 8px;
    padding: 7px 8px;
`;

const CancelBtn = styled.div`
    color: white;
    background-color: var(--midgrey-color);
    border-radius: 8px;
    padding: 7px 8px;
`;

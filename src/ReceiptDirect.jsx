import {useState} from 'react';
import styled from 'styled-components';
import ReceiptAdd from './components/ReceiptAdd';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Container = styled.div`
    display: flex;
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
    height: 100vh; /* 전체 화면 높이 */
`

const Wrapper = styled.div`
    height: 490px;
    background-color: var(--darkgrey-color);
    width: 300px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 5px;
    justify-content: space-around;
`;

const TextContainer = styled.div`
    width: 250px;
`;

const TitleText = styled.div`
    font-weight: bold;
    font-size: 25px;
    color: #FFFFFF;
    text-align: center;
`;

const DateText = styled.div`
    color: #FFFFFF;
    font-size: 13px;
    text-align: end;
`;

const ItemContainer = styled.div`
    width: 250px;
    height: 300px;
    overflow-y: auto;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 20px;
`;

const AddButton = styled.button`
    background-color: var(--red-color);
    width: 200px;
    height: 30px;
    color: white;
    font-size: 13px;
    font-weight: 600;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:disabled {
        background-color: #c5ccd7;
    }
`;
const CancelButton = styled.button`
    background-color: var(--midgrey-color);
    width: 200px;
    height: 30px;
    color: white;
    font-size: 13px;
    font-weight: 600;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:disabled {
        background-color: #c5ccd7;
    }
`;

export default function ReceiptDirect() {
  const navigate = useNavigate();
  const id = localStorage.getItem('user_id');
  const [num, setNum] = useState(0);
  const [items, setItems] = useState([
    {
      user_id: id,
      item_name: '',
      price: '',
      count: '',
      purchase_date: "2024-11-03"
    }
  ]);

  const handleAdd = () => {
    setItems(prevItems => [...prevItems, {user_id: id, item_name: '', price: '', count: '', purchase_date: "2024-11-03"}]); // 새로운 비어있는 항목 추가
  };

  const handleChange = (index, field, value) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index] = {...newItems[index], [field]: value};
      return newItems;
    });
  };

  const AddBtn = () => {
    console.log(items);

    axios.post("http://3.38.23.48:8000/items/addall", {
      items: items
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log("오류 발생:", err.response || err.message);
      });

    navigate('/dashboard');
  }

  const goback = () => {
    navigate('/dashboard');
  }

  return (
    <Container>
    <Wrapper>
      <TextContainer>
        <TitleText>Receipt</TitleText>
        <DateText>2024.10.12</DateText>
      </TextContainer>

      <ItemContainer>
        {items.map((item, index) => (
          <ReceiptAdd
            key={index}
            item={item}
            num={num}
            setNum={setNum}
            onAdd={() => handleAdd()}
            onChange={handleChange}
            index={index}
          />
        ))}
      </ItemContainer>

      <ButtonContainer>
        <AddButton onClick={AddBtn}>추가</AddButton>
        <CancelButton onClick={goback}>취소</CancelButton>
      </ButtonContainer>
    </Wrapper>
    </Container>
  );
}

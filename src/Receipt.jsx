import { useState } from 'react';
import styled from 'styled-components';
import ReceiptDelete from './components/ReceiptDelete';

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

    &:disabled {
        background-color: #c5ccd7;
    }
`;

export default function Receipt() {
    const [items, setItems] = useState([
        { title: '비누', cost: '2000원', count: '3개' },
        { title: '샴푸', cost: '8000원', count: '3개' }
    ]);

    const handleDelete = (index) => {
        setItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    const handleChange = (index, field, value) => {
        setItems(prevItems => {
            const newItems = [...prevItems];
            newItems[index] = { ...newItems[index], [field]: value };
            return newItems;
        });
    };

    const AddBtn = () => {
        console.log(items); // 현재 items 배열을 콘솔에 출력
    };

    return (
        <Wrapper>
            <TextContainer>
                <TitleText>Receipt</TitleText>
                <DateText>2024.10.12</DateText>
            </TextContainer>

            <ItemContainer>
                {items.map((item, index) => (
									<div key={index}>
											<ReceiptDelete 
													item={item} 
													onDelete={() => handleDelete(index)} 
													onChange={(field, value) => handleChange(index, field, value)} // onChange 핸들러 추가
											/>
									</div>
                ))}
            </ItemContainer>
            
            <ButtonContainer>
                <AddButton onClick={AddBtn}>추가</AddButton>
                <AddButton disabled={true}>취소</AddButton>
            </ButtonContainer>
        </Wrapper>
    );
}

import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReceiptDelete from './components/ReceiptDelete';
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

    &:disabled {
        background-color: #c5ccd7;
    }
`;

export default function Receipt() {
    const location = useLocation();
    const navigate = useNavigate();
    const id = localStorage.getItem('user_id');
    const { data } = location.state || {};
    const [items, setItems] = useState([]);

    useEffect(() => {
        console.log(data)
        if (data) {
            const filteredItems = data.filter(item => item.productType && item.productType !== "wrong")
                .map(item => ({
                    user_id: id,
                    item_name: item.productType || "",
                    count: item.count || 0,
                    price: item.price || 0,
                    purchase_date: returnStringDate(new Date())
                }));
            setItems(filteredItems);
        }
    }, [data, id]);

    const AddBtn = () => {
        axios.post("http://3.38.23.48:8000/items/addall", {
            items: items
        })
        .then((res) => {
            console.log(res);
            navigate('/dashboard');
        })
        .catch((err) => {
            console.log("오류 발생:", err.response || err.message);
        });
    }

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

    const returnStringDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
    <Container>
        <Wrapper>
            <TextContainer>
                <TitleText>Receipt</TitleText>
                <DateText>{returnStringDate(new Date())}</DateText>
            </TextContainer>

            <ItemContainer>
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <div key={index}>
                            <ReceiptDelete 
                                item={item} 
                                onDelete={() => handleDelete(index)} 
                                onChange={(field, value) => handleChange(index, field, value)} 
                            />
                        </div>
                    ))
                ) : (
                    <p>데이터가 없습니다.</p>
                )}
            </ItemContainer>
            
            <ButtonContainer>
                <AddButton onClick={AddBtn}>추가</AddButton>
                <AddButton disabled={items.length === 0}>취소</AddButton>
            </ButtonContainer>
        </Wrapper>
        </Container>
    );
}

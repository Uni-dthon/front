import { useState } from 'react';
import PropTypes from 'prop-types'; // PropTypes 추가
import styled from 'styled-components';
import addBtn from './images/addBtn.svg';

const ReceiptAddContainer = styled.div`
    display: flex;
    padding: 10px 0px;
    align-items: center;
    gap: 5px;
`;

const ItemInput = styled.input`
    font-size: 13px;
    font-weight: 500;
    color: #CED2E0;
    background-color: #3A3C43;
    width: 70px;
    border: none;
    border-radius: 10px;
    padding: 3px;
    &:focus {
        border: none;
        outline: none;
    }
`;

export default function ReceiptAdd({ onAdd }) {
    const [title, setTitle] = useState('');
    const [cost, setCost] = useState('');
    const [count, setCount] = useState('');

    const handleAddClick = () => {
        if (title && cost && count) {
            onAdd({ title, cost, count });
            setTitle('');
            setCost('');
            setCount('');
        }
    };

    return (
        <ReceiptAddContainer>
            <ItemInput 
                placeholder="품목" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />
            <ItemInput 
                placeholder="가격" 
                value={cost} 
                onChange={(e) => setCost(e.target.value)} 
            />
            <ItemInput 
                placeholder="수량" 
                value={count} 
                onChange={(e) => setCount(e.target.value)} 
            />
            <img src={addBtn} width={17} height={17} alt="addBtn" onClick={handleAddClick} />
        </ReceiptAddContainer>
    );
}

// PropTypes 추가
ReceiptAdd.propTypes = {
    onAdd: PropTypes.func.isRequired,
};

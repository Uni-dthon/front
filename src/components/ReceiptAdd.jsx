import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // PropTypes 추가
import styled from 'styled-components';
import addBtn from '../images/addBtn.svg';

const ReceiptAddContainer = styled.div`
    display: flex;
    padding: 10px 0px;
    align-items: center;
    gap: 3px;
`;

const ItemInput = styled.input`
    font-size: 13px;
    font-weight: 500;
    color: #CED2E0;
    background-color: #3A3C43;
    width: 65px;
    border: none;
    border-radius: 10px;
    padding: 3px;
    &:focus {
        border: none;
        outline: none;
    }
`;

export default function ReceiptAdd({ item, onAdd, onChange, onAdd, index }) {
    const [title, setTitle] = useState(item.title);
    const [cost, setCost] = useState(item.cost);
    const [count, setCount] = useState(item.count);

    useEffect(() => {
        setTitle(item.title);
        setCost(item.cost);
        setCount(item.count);
    }, [item]);

    const handleInputChange = (field, value) => {
        if (field === 'title') setTitle(value);
        if (field === 'cost') setCost(value);
        if (field === 'count') setCount(value);
        onChange(index, field, value); // 부모에게 변경된 값 전달
    };

    return (
        <ReceiptAddContainer>
            <ItemInput 
                placeholder="품목" 
                value={title} 
                onChange={(e) => handleInputChange('title', e.target.value)} 
            />
            <ItemInput 
                placeholder="가격" 
                value={cost} 
                onChange={(e) => handleInputChange('cost', e.target.value)} 
            />
            <ItemInput 
                placeholder="수량" 
                value={count} 
                onChange={(e) => handleInputChange('count', e.target.value)} 
            />
            <img 
                src={addBtn} 
                width={17} 
                height={17} 
                alt="addBtn" 
                onClick={onAdd}
            />
        </ReceiptAddContainer>
    );
}

// PropTypes 추가
ReceiptAdd.propTypes = {
    item: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired, // onAdd prop 추가
    index: PropTypes.number.isRequired,
};

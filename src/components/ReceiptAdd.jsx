import {useState, useEffect} from 'react';
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

export default function ReceiptAdd({item, onAdd, onChange, index, num, setNum}) {
  const [itemName, setItemName] = useState(item.item_name);
  const [price, setPrice] = useState(item.price);
  const [count, setCount] = useState(item.count);

  useEffect(() => {
    setItemName(item.itemName);
    setPrice(item.price);
    setCount(item.count);
  }, [item]);

  const handleInputChange = (field, value) => {
    if (field === 'itemName') setItemName(value);
    if (field === 'price') setPrice(value);
    if (field === 'count') setCount(value);
    onChange(index, field, value); // 부모에게 변경된 값 전달
  };

  return (
    <ReceiptAddContainer>
      <ItemInput
        placeholder="품목"
        value={itemName}
        onChange={(e) => handleInputChange('item_name', e.target.value)}
      />
      <ItemInput
        placeholder="가격"
        value={price}
        onChange={(e) => handleInputChange('price', e.target.value)}
      />
      <ItemInput
        placeholder="수량"
        value={count}
        onChange={(e) => handleInputChange('count', e.target.value)}
      />
      {num === index && <img
        src={addBtn}
        width={17}
        height={17}
        alt="addBtn"
        onClick={() => {
          onAdd();
          setNum(num + 1);
        }}
      />}

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

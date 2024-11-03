import PropTypes from 'prop-types'; // PropTypes 추가
import styled from 'styled-components';
import deleteBtn from '../images/deleteBtn.svg';

const ReceiptDeleteContainer = styled.div`
    display: flex;
    padding: 10px 0px;
    align-items: center;
    gap: 5px;
`;

const ItemTitle = styled.div`
    font-size: 13px;
    font-weight: 500;
    color: #CED2E0;
    width: 70px;
`;

const ItemCost = styled.input`
    font-size: 13px;
    font-weight: 500;
    color: #CED2E0;
    background-color: #3A3C43;
    width: 70px;
    border: none;
    border-radius: 10px;
    padding: 3px;
`;

const ItemCount = styled.input`
    font-size: 13px;
    font-weight: 500;
    color: #CED2E0;
    background-color: #3A3C43;
    width: 70px;
    border: none;
    border-radius: 10px;
    padding: 3px;
`;

export default function ReceiptDelete({ item, onDelete, onChange }) {
    return (
        <ReceiptDeleteContainer>
            <ItemTitle>{item.item_name}</ItemTitle>
            <ItemCost 
                defaultValue={item.count} 
                onBlur={(e) => onChange('cost', e.target.value)} // onBlur 이벤트로 값 저장
            />
            <ItemCount 
                defaultValue={item.price} 
                onBlur={(e) => onChange('count', e.target.value)} // onBlur 이벤트로 값 저장
            />
            <img src={deleteBtn} width={27} height={27} alt="deleteBtn" onClick={onDelete} />
        </ReceiptDeleteContainer>
    );
}

// PropTypes 추가
ReceiptDelete.propTypes = {
    item: PropTypes.shape({
        item_name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        count: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired, // onChange prop 추가
};

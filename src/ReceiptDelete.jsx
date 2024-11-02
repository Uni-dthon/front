import PropTypes from 'prop-types'; // PropTypes 추가
import styled from 'styled-components';
import deleteBtn from './images/deleteBtn.svg';

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

export default function ReceiptDelete({ item, onDelete }) {
    return (
        <ReceiptDeleteContainer>
            <ItemTitle>{item.title}</ItemTitle>
            <ItemCost defaultValue={item.cost} />
            <ItemCount defaultValue={item.count} />
            <img src={deleteBtn} width={27} height={27} alt="deleteBtn" onClick={onDelete} />
        </ReceiptDeleteContainer>
    );
}

// PropTypes 추가
ReceiptDelete.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        cost: PropTypes.string.isRequired,
        count: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

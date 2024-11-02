import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ItemList = styled.div`
  color: #FFFFFF;
  padding: 10px;
`;

const DateListContainer = styled.div`
  width: 350px;
  height: 30px;
  background-color: var(--darkgrey-color);
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ListText = styled.div`
  color: var(--lightgrey-color);
`;

const ExpendDdayText = styled.div`
  color: var(--lightgrey-color);
`;

export default function ExtendList({ itemSelect }) {
  const [Dday, setDdaySelect] = useState("");

  const calculateDDay = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);

    const differenceInTime = target - today;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)) - 1;

    if (differenceInDays > 0) {
      return `D-${differenceInDays}`;
    } else if (differenceInDays < 0) {
      return `D+${Math.abs(differenceInDays)}`;
    } else {
      return "D-day";
    }
  };

  useEffect(() => {

    if (itemSelect && itemSelect.date) {
      const dday = calculateDDay(itemSelect.date);
      setDdaySelect(dday);
    }
  }, [itemSelect]);

  // itemSelect가 유효하지 않거나 리스트가 비어있으면 null 리턴
  if (!itemSelect || itemSelect.list.length === 0) return null;

  return (
    <>
      <DateListContainer>
        <ListText>{itemSelect.date}</ListText>
        <ListText>예상 구매 물품</ListText>
        <ExpendDdayText>{Dday}</ExpendDdayText>
      </DateListContainer>
      <ItemContainer>
        {itemSelect.list.map((item, index) => (
          <ItemList key={index}>{item}</ItemList>
        ))}
      </ItemContainer>
    </>
  );
}

ExtendList.propTypes = {
  itemSelect: PropTypes.shape({
    date: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

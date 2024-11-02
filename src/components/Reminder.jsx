import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px); /* 위에서 아래로 이동하는 효과 */
  }
  to {
    opacity: 1;
    transform: translateY(0); /* 원래 위치로 돌아옴 */
  }
`;

const ReminderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ItemList = styled.div`
  color: #FFFFFF;
  font-weight: 500;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
  overflow: hidden;
  transition: opacity 0.5s ease-in-out;
`;

const ItemName = styled.div`
  color: #FF3951;
  font-weight: 700;
  font-size: 14px;
  margin: 0 5px;
`;

const ItemInfo = styled.div`
  color: #FFFFFF;
  font-weight: 700;
  font-size: 14px;
`;

export default function Reminder({ itemReminder }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3초마다 currentIndex 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % itemReminder.length);
    }, 3000); // 3초

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
  }, [itemReminder.length]);

  const calculateDDay = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    
    // 유효한 날짜인지 확인
    if (isNaN(target.getTime())) {
      return "유효하지 않은 날짜";
    }

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

  // itemReminder가 유효하지 않거나 리스트가 비어있으면 null 리턴
  if (!Array.isArray(itemReminder) || itemReminder.length === 0) return null;

  return (
    <ReminderContainer>
      <ItemList key={currentIndex}>
        <ItemName>{itemReminder[currentIndex].item_name}</ItemName>
        <ItemInfo>예상 구매일까지</ItemInfo>
        <ItemName>{calculateDDay(itemReminder[currentIndex].consume_date)}일</ItemName>
        <ItemInfo>남았습니다</ItemInfo>
      </ItemList>
    </ReminderContainer>
  );
}

Reminder.propTypes = {
  itemReminder: PropTypes.arrayOf(PropTypes.shape({
    item_name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    consume_date: PropTypes.string.isRequired, // D-day 계산을 위한 예상 구매일
  })).isRequired,
};

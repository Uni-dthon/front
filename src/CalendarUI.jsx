import { useState } from 'react';
import styled from 'styled-components';
import calendarBag from './images/calendarBag.svg';
import previousBtn from './images/previousBtn.svg';
import nextBtn from './images/nextBtn.svg';
import dayBasic from './images/dayBasic.svg';
import dayTomato from './images/dayTomato.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${calendarBag});
  background-repeat: no-repeat;
  background-position: center;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MonthText = styled.div`
  color: #FFFFFF;
  padding: 0px 10px;
  font-size: 24px;
  font-weight: bold;
`;

const PreviousBtn = styled.div`
  background-image: url(${previousBtn});
  background-repeat: no-repeat;
  width: 13px;
  height: 13px;
  cursor: pointer; // 클릭 가능하게 설정
`;

const NextBtn = styled.div`
  background-image: url(${nextBtn});
  background-repeat: no-repeat;
  width: 13px;
  height: 13px;
  cursor: pointer; // 클릭 가능하게 설정
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Week = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
`;

const WeekLabel = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0px;
  border-bottom: 1px solid #FFFFFF;
`;

const DateCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  margin: 0 5px;
  text-align: center;
  width: 30px;
  height: 60px;
  transition: background-color 0.3s;
  justify-content: center;
  position: relative;
`;

const DayImg = styled.div`
  background-image: ${props => props.dayCount === 0 ? `url(${dayBasic})` : `url(${dayTomato})`};
  background-repeat: round;
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
`;

const WeekText = styled.div`
  color: #FFFFFF;
  font-size: 20px;
`;

const DateText = styled.div`
  color: ${props => (props.isCurrentMonth ? '#FFFFFF' : '#2F323D')};
`;

const CountText = styled.div`
  color: ${props => (props.isCurrentMonth && props.dayCount > 0 ? '#FFFFFF' : 'transparent')};
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function CalendarUI() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = new Date(firstDayOfMonth);
  startDay.setDate(1 - firstDayOfMonth.getDay()); // 일요일을 시작으로 설정

  const lastDayOfMonth = new Date(year, month + 1, 0);
  const endDay = new Date(lastDayOfMonth);
  endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay())); // 마지막 주의 토요일까지 포함

  const groupDatesByWeek = (startDay, endDay) => {
    const weeks = [];
    let currentWeek = [];
    let currentDate = new Date(startDay);

    while (currentDate <= endDay) {
      currentWeek.push(new Date(currentDate));

      if (currentWeek.length === 7 || currentDate.getDay() === 6) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const dataCounts = [
    { date: '2024-11-01', count: 5 },
    { date: '2024-11-02', count: 3 },
    { date: '2024-11-04', count: 7 },
    { date: '2024-11-08', count: 6 },
    { date: '2024-11-09', count: 0 },
    { date: '2024-11-10', count: 8 },
    { date: '2024-11-11', count: 3 },
    { date: '2024-11-12', count: 5 },
    { date: '2024-11-13', count: 2 },
    { date: '2024-11-29', count: 2 },
    { date: '2024-11-30', count: 4 },
    { date: '2024-11-31', count: 1 }
  ];

  const weeks = groupDatesByWeek(startDay, endDay);

  return (
    <Container>
      <ButtonContainer>
        <PreviousBtn onClick={handlePrevMonth} />
        <MonthText>
          {year}.{month + 1}
        </MonthText>
        <NextBtn onClick={handleNextMonth} />
      </ButtonContainer>
      <CalendarContainer>
        <WeekLabel>
          {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
            <WeekText key={index}>{day}</WeekText>
          ))}
        </WeekLabel>
        {weeks.map((week, index) => (
          <Week key={index}>
            {week.map((date) => {
              const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
              const dayCount = dataCounts.find(item => item.date === dateString)?.count || 0; // count가 없으면 0
              const isCurrentMonth = date.getMonth() === month;

              return (
                <DateCard key={date}>
                  <DayImg dayCount={dayCount} />
                  <CountText isCurrentMonth={isCurrentMonth} dayCount={dayCount}>{dayCount}</CountText>
                  <DateText isCurrentMonth={isCurrentMonth}>{date.getDate()}</DateText>
                </DateCard>
              );
            })}
          </Week>
        ))}
      </CalendarContainer>
    </Container>
  );
}

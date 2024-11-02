import { useState, useEffect } from 'react';
import styled from 'styled-components';
import calendarBag from './images/calendarBag.svg';
import previousBtn from './images/previousBtn.svg';
import nextBtn from './images/nextBtn.svg';
import dayBasic from './images/dayBasic.svg';
import dayTomato from './images/dayTomato.svg';
import cloud from './images/cloud.svg';
import ExtendList from './ExtendList';
import Reminder from './components/Reminder.jsx';
import BottomNav from "./BottomNav.jsx";
import axios from "axios";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [itemSelect, setItemSelect] = useState(null);
  const [itemReminder, setItemReminder] = useState([]);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const [monthExpend, setMonthExpend] = useState(0);
  const [data, setData] = useState({}); // 날짜별 물품 정보를 객체로 초기화
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const getUserItem = async () => {
      try {
        const response = await axios.get(`http://3.38.23.48:8000/items/${userId}?category=전체`);
        const items = response.data.items;

        // items를 날짜별로 그룹화
        const groupedData = items.reduce((acc, item) => {
          if (!acc[item.consume_date]) {
            acc[item.consume_date] = []; // 날짜가 없으면 초기화
          }
          acc[item.consume_date].push(item.item_name); // 물품 리스트 추가
          return acc;
        }, {});
  
        setData(groupedData); // 상태에 저장
        setItemReminder(response.data.items);
      } catch (error) {
        console.error("사용자 아이템 가져오기 오류:", error);
      }
    };

    const getUserMonthExpend = async () => {
      const yearMonth = `${String(year)}-${String(month + 1).padStart(2, '0')}`;
      console.log(yearMonth);
      const response = await axios.get(`http://3.38.23.48:8000/price/${userId}?date=${yearMonth}`);
      setMonthExpend(response.data.price);
    }

    if (userId) {
      getUserItem(); // userId가 존재할 때만 API 호출
      getUserMonthExpend();
    }

  }, [userId, month]);


  // 첫 번째 날과 마지막 날 정의
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // 달력의 시작일을 주의 일요일로 설정
  const startDay = new Date(firstDayOfMonth);
  startDay.setDate(startDay.getDate() - startDay.getDay());

  // 달력의 종료일을 주의 토요일로 설정
  const endDay = new Date(lastDayOfMonth);
  endDay.setDate(endDay.getDate() + (6 - lastDayOfMonth.getDay()));

  // 주 단위로 날짜 그룹화
  const groupDatesByWeek = (start, end) => {
    const weeks = [];
    let currentWeek = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
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

  const returnStringDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`; // YYYY-MM-DD 형식으로 반환
  };

  const weeks = groupDatesByWeek(startDay, endDay);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getItemList = (date) => {
    const dateString = returnStringDate(date);
    const items = data[dateString] || [];
    
    setItemSelect({ date: dateString, list: items }); 
  };

  return (
    <Wrapper>
      <Reminder itemReminder={itemReminder} />
      <Container>
        <ButtonContainer>
          <PreviousBtn onClick={handlePrevMonth}/>
          <MonthText>{year}.{month + 1}</MonthText>
          <NextBtn onClick={handleNextMonth}/>
        </ButtonContainer>
        <CalendarContainer>
          <WeekLabel>
            {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
              <WeekText key={index}>{day}</WeekText>
            ))}
          </WeekLabel>
          {weeks.map((week, index) => (
            <Week key={index}>
              {week.map(date => {
                const formattedDate = returnStringDate(date);
                
                // 해당 날짜의 물품 개수 가져오기
                const dayCount = data[formattedDate] ? data[formattedDate].length : 0;
  
                const isCurrentMonth = date.getMonth() === month;
                return (
                  <DateCard 
                    key={date} 
                    onClick={() => getItemList(date)}>
                    <DayImg dayCount={dayCount} isCurrentMonth={isCurrentMonth}/>
                    {dayCount > 0 && (
                      <CountText isCurrentMonth={isCurrentMonth} dayCount={dayCount}>{dayCount}</CountText>
                    )}
                    <DateText isCurrentMonth={isCurrentMonth}>{date.getDate()}</DateText>
                  </DateCard>
                );
              })}
            </Week>
          ))}
        </CalendarContainer>
      </Container>
  
      <ThisMonthExpend>
        <MonthText>{month + 1}월 예상 지출 금액</MonthText>
        <MoneyText><TomatoText>{monthExpend}</TomatoText>원</MoneyText>
      </ThisMonthExpend>
  
      {itemSelect && <ExtendList itemSelect={itemSelect} />}
      <BottomNav toggle={true}/>
    </Wrapper>
  );
}


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    align-items: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url(${calendarBag});
    background-repeat: no-repeat;
    background-position: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
`;

const MonthText = styled.div`
    color: #FFFFFF;
    padding: 10px 10px;
    font-size: 20px;
    font-weight: bold;
`;

const TomatoText = styled.div`
    font-size: 30px;
    font-weight: bold;
    color: var(--red-color);
`

const PreviousBtn = styled.div`
    background-image: url(${previousBtn});
    background-repeat: no-repeat;
    width: 13px;
    height: 13px;
    cursor: pointer;
`;

const NextBtn = styled.div`
    background-image: url(${nextBtn});
    background-repeat: no-repeat;
    width: 13px;
    height: 13px;
    cursor: pointer;
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
    background-image: ${props =>
            props.isCurrentMonth
                    ? (props.dayCount === 0 ? `url(${dayBasic})` : `url(${dayTomato})`)
                    : `url(${dayBasic})`};
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

const ThisMonthExpend = styled.div`
  width: 250px;
  height: 150px;
  margin: 30px;
  background-image: url(${cloud});
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MoneyText = styled.div`
    color: #FFFFFF;
    font-size: 30px;
    font-weight: bold;
    display: flex;
`;
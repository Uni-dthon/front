import {useState} from "react";
import styled from "styled-components";
import dropdown from "../images/dropdown.svg";

export default function DropdownMenu({setCategory}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("전체");

  const options = ["전체", "거실", "욕실", "주방", "세탁실"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setCategory(option);
    setIsOpen(false);
  };

  return (
    <Container>
      <Button onClick={toggleDropdown}>
        <img src={dropdown} alt="dropdown" style={{transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}/>
        {selectedOption}
      </Button>
      {isOpen && (
        <Dropdown>
          {options.map((option) => (
            <Option
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </Option>
          ))}
        </Dropdown>
      )}
    </Container>
  );
}

// 스타일 객체
const Container = styled.div`
    display: inline-block;
    margin-left: -15px;
    margin-top: 45px;
    margin-bottom: 18px;
`;

const Button = styled.button`
    padding: 10px 20px;
    font-size: 18px;
    background-color: transparent;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: Pretendard-SemiBold;
    display: flex;
    gap: 10px;
    -webkit-tap-highlight-color: transparent;
`;

const Dropdown = styled.div`
    position: absolute;
    background-color: var(--midgrey-color);
    opacity: 80%;
    border-radius: 7px;
    z-index: 1;
    margin-top: 5px;
    margin-left: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 70%;
`;

const Option = styled.div`
    padding: 10px 15px;
    cursor: pointer;
    color: white;
    font-family: Pretendard-Regular;

    &:hover {
        background-color: var(--midgrey-color);
    }
`;

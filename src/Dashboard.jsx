import DropdownMenu from "./components/Dropdown.jsx";
import ItemBox from "./components/ItemBox.jsx";
import styled from "styled-components";
import UploadBtn from "./components/UploadBtn.jsx";
import {useState} from "react";

const dummy = [
  {id: "0", name: "휴지", price: "1000", count: 1},
  {id: "1", name: "세제", price: "3500", count: 33},
  {id: "2", name: "휴지", price: "1000", count: 1},
  {id: "3", name: "휴지", price: "1000", count: 1},
]

export default function Dashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [addVisible, setAddVisible] = useState({});

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleAdd = (id) => {
    setAddVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  return (
    <div>
      <DropdownMenu/>
      {addVisible && <Modal/>}
      <ItemContainer>
        {dummy.map((item, idx) => {
          return <ItemBox key={item.id} id={item.id} name={item.name} price={item.price} count={item.count}
                          handleAdd={handleAdd}
                          addVisible={addVisible}/>
        })}
      </ItemContainer>
      <Upload>
        <UploadBtn handleClick={handleClick} isVisible={isVisible}/>
      </Upload>
    </div>
  )
}

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
`

const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
`

const Upload = styled.div`
    position: fixed;
    bottom: 10px;
    right: 20px;
`
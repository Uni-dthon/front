import DropdownMenu from "./components/Dropdown.jsx";
import ItemBox from "./components/ItemBox.jsx";
import styled from "styled-components";
import UploadBtn from "./components/UploadBtn.jsx";
import {useEffect, useState} from "react";
import BottomNav from "./BottomNav.jsx";
import axios from "axios";

export default function Dashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("전체");
  const [items, setItems] = useState([]);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleAdd = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    axios.get(`http://3.38.23.48:8000/items/${id}?category=${category}`)
      .then((res) => {
        const data = res.data.items;
        console.log(data);
        setItems(data);
      })
      .catch((err) => {
        console.log("오류 발생:", err.response.data || err.message);
      });
  }, [category]);

  const consume = (name) => {
    const id = localStorage.getItem("user_id");
    axios.post("http://3.38.23.48:8000/items/consume", {
      user_id: id,
      item_name: name,
      consume_count: 1,
      consume_date: "2024-11-03"
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log("오류 발생:", err.response.data || err.message);
      });
  }

  const addone = (name, price) => {
    const id = localStorage.getItem("user_id");
    axios.post("http://3.38.23.48:8000/items/addone", {
      user_id: id,
      item_name: name,
      count: 1,
      price: price,
      consume_date: "2024-11-03"
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log("오류 발생:", err.response || err.message);
      });
  }


  return (
    <div>
      <DropdownMenu setCategory={setCategory}/>
      {modalVisible && <Modal/>}
      <ItemContainer>
        {items.map((item, idx) => {
          return <ItemBox key={idx} name={item.item_name} price={item.price} count={item.count}
                          setModalVisible={setModalVisible} consume={consume} addone={addone}/>
        })}
      </ItemContainer>
      <Upload>
        <UploadBtn handleClick={handleClick} isVisible={isVisible} setIsVisible={setIsVisible}/>
      </Upload>
      <BottomNav toggle={false}/>
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
    bottom: 110px;
    right: 20px;
`
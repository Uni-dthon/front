import styled from 'styled-components'
import addBtn from './images/addBtn.svg';

const ReceiptAddContainer = styled.div`
    display: flex;
    padding: 10px 0px;
    align-items: center;
    gap: 5px;
`

const ItemTitle = styled.input`
    font-size: 13px;
    font-weight: 500;
    color: #CED2E0;
    background-color: #3A3C43;
    width: 70px;
    border: none;
    outline: none;
    border-radius: 10px;
    padding: 3px;
`

const InputContainer = styled.input`
    font-size: 13px;
    font-weight: 500;
    color: #CED2E0;
    background-color: #3A3C43;
    width: 70px;
    border: none;
    border-radius: 10px;
    padding: 3px;
`

export default function ReceiptAdd() {
    return(
        <ReceiptAddContainer>
            <ItemTitle defaultValue={"휴지"} />
            <InputContainer defaultValue={"2000원"} />
            <InputContainer defaultValue={"3개"}/>
            <img src={addBtn} width={17} height={17} alt="addBtn"/>
        </ReceiptAddContainer>
    )
}
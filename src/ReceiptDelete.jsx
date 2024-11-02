import styled from 'styled-components'
import deleteBtn from './images/deleteBtn.svg';

const ReceiptDeleteContainer = styled.div`
    display: flex;
    padding: 10px 0px;
    align-items: center;
    gap: 5px;
`

const ItemTitle = styled.div`
    font-size: 13px;
    font-weight: 500;
    color: #CED2E0;
    width: 70px;
`

const ItemCost = styled.input`
    font-size: 13px;
    font-weight: 500;
    color: #CED2E0;
    background-color: #3A3C43;
    width: 70px;
    border: none;
    border-radius: 10px;
    padding: 3px;
`

const ItemCount = styled.input`
    font-size: 13px;
    font-weight: 500;
    color: #CED2E0;
    background-color: #3A3C43;
    width: 70px;
    border: none;
    border-radius: 10px;
    padding: 3px;
`

export default function ReceiptDelete() {
    return(
        <ReceiptDeleteContainer>
            <ItemTitle>휴지</ItemTitle>
            <ItemCost defaultValue={"2000원"} />
            <ItemCount defaultValue={"3개"}/>
            <img src={deleteBtn} width={27} height={27} alt="deleteBtn"/>
        </ReceiptDeleteContainer>
    )
}
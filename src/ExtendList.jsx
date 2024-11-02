import styled from 'styled-components';

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const ItemList = styled.div`
  color: #FFFFFF;
  padding: 10px;
`

export default function ExtendList() {
  return(
    <ItemContainer>
      <ItemList>세제</ItemList>
      <ItemList>휴지</ItemList>
      <ItemList>샴푸</ItemList>
      <ItemList>클렌징폼</ItemList>
      <ItemList>세제</ItemList>
      <ItemList>휴지</ItemList>
      <ItemList>샴푸</ItemList>
      <ItemList>클렌징폼</ItemList>
    </ItemContainer>
  )

}
import styled from 'styled-components';
import ReceiptDelete from './ReceiptDelete';
import ReceiptAdd from './ReceiptAdd';

const Wrapper = styled.div`
	height: 490px;
	background-color: var(--darkgrey-color);
	width: 300px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 15px 5px;
	justify-content: space-around;
`

const TextContainer = styled.div`
	width: 250px;
`

const TitleText = styled.div`
	font-weight: bold;
	font-size: 25px;
	color: #FFFFFF;
	text-align: center;
`

const DateText = styled.div`
	color: #FFFFFF;
	font-size: 13px;
	text-align: end;
`

const ItemContainer = styled.div`
	width: 250px;
	height: 300px;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 20px;
`;

const AddButton = styled.button`
    background-color: var(--red-color);
		width: 200px;
    height: 30px;
    color: white;
    font-size: 13px;
    font-weight: 600;
    border-radius: 12px;
    border: none;
    cursor: pointer;

    &:disabled {
			background-color: #c5ccd7;
    }
`;


export default function Receipt() {
return(
	<Wrapper>
		<TextContainer>
			<TitleText>Receipt</TitleText>
			<DateText>2024.10.12</DateText>
		</TextContainer>

		<ItemContainer>
			<ReceiptDelete />
			<ReceiptAdd />
		</ItemContainer>

		<ButtonContainer>
			<AddButton>추가</AddButton>
			<AddButton disabled={true}>취소</AddButton>
		</ButtonContainer>
	</Wrapper>
)

}
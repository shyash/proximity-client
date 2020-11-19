import React from 'react';
import styled, { StyledComponent } from 'styled-components';

const Container: StyledComponent<'div', any, {}, never> = styled.div`
	background: #191515;
	display: flex;
	justify-content: center;
	color: #fff5f2;
	padding: 15px;
	font-size: 20px;
`;

interface Props {
	content: string;
}
export const Message: React.FC<Props> = (props) => {
	return <Container>{props.content}</Container>;
};

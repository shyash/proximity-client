import React, { useState } from 'react';
import styled, { StyledComponent } from 'styled-components';

const Wrapper: StyledComponent<'div', any, {}, never> = styled.div` 
	display: flex;
	justify-content: center;
    flex-direction: column;
    align-items:flex-start
    height: 100vh;
    
`;

const Button = styled.button`
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 2em;
	border-radius: 3px;
	font-size: 20px;
	background: #673ab7;
	border: none;
	color: white;
	cursor: pointer;
`;

const Input = styled.input`
	padding: 0.5em;
	color: white;
	margin: 0.5em;
	background: #5a5a5a;
	border: none;
	font-size: 18px;
	border-radius: 3px;
`;
const TextArea = styled.textarea`
	padding: 0.5em;
	color: white;
	margin: 0.5em;
	background: #5a5a5a;
	border: none;
	font-size: 18px;
	border-radius: 3px;
	resize: vertical;
	height: 80px;
`;

export const Home: React.FC = (props) => {
	const [lattitude, setLattitude] = useState<number>();
	const [longitude, setLongitude] = useState<number>();
	const [content, setContent] = useState<string>('');
	const [imageSrc, setImageSrc] = useState<string>('');
	const [imageLocalSrc, setImageLocalSrc] = useState<string>('');
	return (
		<Wrapper>
			<Input
				type='number'
				value={lattitude}
				placeholder='Lattitude'
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setLattitude(+e.target.value);
				}}
			/>
			<Input
				type='number'
				value={longitude}
				placeholder='Longitude'
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setLongitude(+e.target.value);
				}}
			/>
			<TextArea
				value={content}
				placeholder='Enter advertisement content here'
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
					setContent(e.target.value);
				}}
			/>
			<Input
				type='file'
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setImageLocalSrc(URL.createObjectURL(e.target.files![0]));
				}}
			/>
			{imageLocalSrc && <img src={imageLocalSrc} alt='' />}
			<Button
				onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
					e.preventDefault();
				}}
			>
				Create Room
			</Button>
		</Wrapper>
	);
};

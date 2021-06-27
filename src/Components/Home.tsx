import React, { useState, useEffect } from 'react';
import styled, { StyledComponent } from 'styled-components';
import server from '../axios-server';
import { Message } from './Message';
import { uploadImage } from '../utils/uploadImage';

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
const P = styled.p`
	padding: 0.5em;
	color: white;
	margin: 0.5em;
	background: #5a5a5a;
	border: none;
	font-size: 18px;
	border-radius: 3px;
`;

export const Home: React.FC = (props) => {
	const [lattitude, setLattitude] = useState<number>();
	const [longitude, setLongitude] = useState<number>();
	const [content, setContent] = useState<string>('');
	const [imageSrc, setImageSrc] = useState<string>('');
	const [imageLocalSrc, setImageLocalSrc] = useState<string>('');
	const [message, setMessage] = useState<string>('');
	useEffect(() => {
		const cont = localStorage.getItem('content');
		if (cont) setContent(cont);
	}, []);
	return (
		<Wrapper>
			{message && <Message content={message} />}
			<Input
				type="number"
				value={lattitude}
				placeholder="Lattitude"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setLattitude(+e.target.value);
				}}
			/>
			<Input
				type="number"
				value={longitude}
				placeholder="Longitude"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setLongitude(+e.target.value);
				}}
			/>
			<TextArea
				value={content}
				placeholder="Enter advertisement content here"
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
					setContent(e.target.value);
					localStorage.setItem('content', content);
				}}
			/>
			<Input
				type="file"
				onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
					const file = e.target.files![0];
					setImageLocalSrc(URL.createObjectURL(file));
					const url = await uploadImage(file);
					setImageSrc(url);
				}}
			/>
			{imageLocalSrc && (
				<img
					width="400px"
					style={{ margin: '10px' }}
					src={imageLocalSrc}
					alt=""
				/>
			)}
			{imageSrc && <P>File uploaded : {imageSrc}</P>}
			<Button
				onClick={async (
					e: React.MouseEvent<HTMLButtonElement, MouseEvent>
				) => {
					e.preventDefault();
					if (lattitude && longitude && content && imageSrc) {
						const response = await server.post(
							`/api/advertisements/`,
							{
								lattitude,
								longitude,
								content,
								imageSrc,
							}
						);
						if (response.data.success) {
							setContent('');
							setImageLocalSrc('');
							setImageSrc('');
							setMessage('Advertisement saved successfully');
							setTimeout(() => {
								setMessage('');
							}, 4000);
						} else {
							setMessage(response.data.error);
							setTimeout(() => {
								setMessage('');
							}, 4000);
						}
						console.log(response);
					} else {
						setMessage('Please fill all the fields');
						setTimeout(() => {
							setMessage('');
						}, 4000);
					}
				}}
			>
				Submit advertisement
			</Button>
		</Wrapper>
	);
};

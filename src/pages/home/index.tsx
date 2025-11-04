import { getPokemonInfo } from '@/services/api';
import { useAtom } from 'jotai';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { messageAtom } from './store';

const Home: React.FC = () => {
	const navigate = useNavigate();
	const [message, setMessage] = useAtom(messageAtom);

	const { data, isLoading } = useSWR('getPokemonInfo', () => {
		return getPokemonInfo();
	});

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '10px',
				padding: '20px',
			}}
		>
			<h2>首页</h2>

			<p>
				<span>传递给个人页的atom: </span>
				<input
					type="text"
					value={message}
					onChange={(e) => {
						setMessage(e.target.value);
					}}
				/>
			</p>

			<div>
				<button onClick={() => navigate('/profile')}>跳转到个人页</button>
			</div>

			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
					height: '40px',
				}}
			>
				<div>swr接口请求: </div>
				{isLoading ? (
					<div>loading...</div>
				) : data && data.data.sprites.default ? (
					<img src={data.data.sprites.default} alt="pokemon" />
				) : (
					<div>获取失败</div>
				)}
			</div>
		</div>
	);
};

export default Home;

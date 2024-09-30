import { getPokemonInfo } from '@/services/api';
import { useAtom } from 'jotai';
import React from 'react';
import { messageAtom } from './store';
import useSWR from 'swr';

const Home: React.FC = () => {
	const [message, setMessage] = useAtom(messageAtom);

	const { data, isLoading } = useSWR('getPokemonInfo', () => {
		return getPokemonInfo();
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h2>首页</h2>
			<p>欢迎来到我们的网站!</p>
			<p>
				<span>message:</span>
				<input
					type="text"
					value={message}
					onChange={(e) => {
						setMessage(e.target.value);
					}}
				/>
			</p>
			<br />
			{data && data.data.sprites.default && <img src={data.data.sprites.default} alt="pokemon" />}
		</div>
	);
};

export default Home;

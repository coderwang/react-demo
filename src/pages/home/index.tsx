import { getPokemonInfo } from '@/services/api';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { messageAtom } from './store';

const Home: React.FC = () => {
	const [message, setMessage] = useAtom(messageAtom);
	const [pokemonImage, setPokemonImage] = useState('');

	const handleGetPokemonInfo = async () => {
		const res = await getPokemonInfo();
		setPokemonImage(res.data.sprites.default);
	};

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
			<button onClick={handleGetPokemonInfo}>获取宝可梦信息</button>
			<br />
			{pokemonImage && <img src={pokemonImage} alt="pokemon" />}
		</div>
	);
};

export default Home;

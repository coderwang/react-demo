import { getPokemonInfo } from '@/services/api';
import React, { useState } from 'react';

const Home: React.FC = () => {
	const [pokemonImage, setPokemonImage] = useState('');

	const handleGetPokemonInfo = async () => {
		const res = await getPokemonInfo();
		setPokemonImage(res.data.sprites.default);
	};

	return (
		<div>
			<h2>首页</h2>
			<p>欢迎来到我们的网站!</p>
			<button onClick={handleGetPokemonInfo}>获取宝可梦信息</button>
			<br />
			{pokemonImage && <img src={pokemonImage} alt="pokemon" />}
		</div>
	);
};

export default Home;

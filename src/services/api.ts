import axios from 'axios';

export const getPokemonInfo = () => {
	return axios.get('https://pokeapi.co/api/v2/item/100');
};

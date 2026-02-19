import { pokeApi } from '@/services/api';

export async function getPokemons(limit = 10, offset = 0) {
  const response = await pokeApi.get('/pokemon', {
    params: {
      limit,
      offset,
    },
  });

  return response.data;
}

export async function getPokemonByName(name: string) {
  const response = await pokeApi.get(`/pokemon/${name}`);
  return response.data;
}

export async function getTypeById(id: string) {
  const response = await pokeApi.get(`/type/${id}`);
  return response.data;
}

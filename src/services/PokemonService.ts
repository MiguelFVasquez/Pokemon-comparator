import pokemonApi from '../api/pokemonApi';
import type { PokemonDetail } from '../interfaces/Pokemon';

/**
 * Obtiene los datos detallados de un Pokémon por su nombre o ID
 */
export const getPokemonDetails = async (nameOrId: string | number): Promise<PokemonDetail> => {
  const { data } = await pokemonApi.get<PokemonDetail>(`/pokemon/${nameOrId}`);
  return data;
};

/**
 * Obtiene una lista simplificada de todos los Pokémon para el autocompletado
 */
export const getPokemonListAll = async () => {
  const { data } = await pokemonApi.get<{ results: { name: string; url: string }[] }>('/pokemon?limit=2000');
  return data.results;
};

/**
 * Ejemplo por si necesitas una lista inicial (Opcional por ahora)
 */
export const getPokemonList = async (limit = 20, offset = 0) => {
  const { data } = await pokemonApi.get(`/pokemon?limit=${limit}&offset=${offset}`);
  return data;
};
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
 * Obtiene la descripción de una habilidad en español (o inglés si no hay español)
 */
export const getAbilityDescription = async (url: string): Promise<string> => {
  const { data } = await pokemonApi.get(url);
  
  // Las descripciones están en effect_entries
  const effectEntries = (data as any).effect_entries || [];
  
  const spanishEntry = effectEntries.find((entry: any) => entry.language.name === 'es');
  const englishEntry = effectEntries.find((entry: any) => entry.language.name === 'en');
  
  return spanishEntry ? spanishEntry.short_effect : (englishEntry ? englishEntry.short_effect : 'No hay descripción disponible.');
};

/**
 * Obtiene una lista paginada de Pokémon
 */
export const getPokemonList = async (limit = 20, offset = 0) => {
  const { data } = await pokemonApi.get(`/pokemon?limit=${limit}&offset=${offset}`);
  return data;
};

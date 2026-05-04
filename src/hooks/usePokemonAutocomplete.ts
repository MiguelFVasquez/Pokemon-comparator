import { useQuery } from '@tanstack/react-query';
import { getPokemonListAll } from '../services/PokemonService';

export const usePokemonAutocomplete = () => {
  return useQuery({
    queryKey: ['pokemon-list-all'],
    queryFn: getPokemonListAll,
    staleTime: 1000 * 60 * 60, // 1 hora
  });
};

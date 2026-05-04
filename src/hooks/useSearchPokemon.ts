import { useQuery } from '@tanstack/react-query';
import { getPokemonDetails } from '../services/PokemonService';

export const useSearchPokemon = (searchTerm: string) => {
  return useQuery({
    queryKey: ['pokemon', searchTerm],
    queryFn: () => getPokemonDetails(searchTerm.toLowerCase().trim()),
    enabled: !!searchTerm,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

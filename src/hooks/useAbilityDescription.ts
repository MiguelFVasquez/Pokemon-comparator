import { useQuery } from '@tanstack/react-query';
import { getAbilityDescription } from '../services/PokemonService';

export const useAbilityDescription = (url: string) => {
  return useQuery({
    queryKey: ['ability', url],
    queryFn: () => getAbilityDescription(url),
    enabled: !!url,
    staleTime: 1000 * 60 * 60 * 24, // 24 horas (las habilidades no cambian)
  });
};

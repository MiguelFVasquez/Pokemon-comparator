import { useState } from 'react';
import SearchBar from './SearchBar';
import SearchCard from './SearchCard';
import { useSearchPokemon } from '../../hooks/useSearchPokemon';

const SearchFeature = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: pokemon, isLoading, isError, error } = useSearchPokemon(searchTerm);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <section>
      <SearchBar onSearch={handleSearch} />
      
      {isLoading && <p style={{ textAlign: 'center' }}>Cargando Pokémon...</p>}
      
      {isError && (
        <p style={{ textAlign: 'center', color: 'red' }}>
          {(error as any)?.response?.status === 404 
            ? 'Pokémon no encontrado. Intenta con otro nombre o ID.' 
            : 'Ocurrió un error al buscar el Pokémon.'}
        </p>
      )}

      {pokemon && !isLoading && !isError && (
        <SearchCard pokemon={pokemon} />
      )}
    </section>
  );
};

export default SearchFeature;

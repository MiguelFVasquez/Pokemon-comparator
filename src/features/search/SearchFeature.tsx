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

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <section>
      <SearchBar onSearch={handleSearch} externalValue={searchTerm} />
      
      {isLoading && <p style={{ textAlign: 'center' }}>Cargando Pokémon...</p>}
      
      {isError && (
        <p style={{ textAlign: 'center', color: 'red' }}>
          {(error as any)?.response?.status === 404 
            ? 'Pokémon no encontrado. Intenta con otro nombre.' 
            : 'Ocurrió un error al buscar el Pokémon.'}
        </p>
      )}

      {pokemon && !isLoading && !isError && searchTerm !== '' && (
        <SearchCard pokemon={pokemon} onSelect={handleClearSearch} />
      )}
    </section>
  );
};

export default SearchFeature;

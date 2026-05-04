import  { useState,  useEffect, useRef, type KeyboardEvent, type FormEvent } from 'react';
import styles from './SearchBar.module.css';
import { usePokemonAutocomplete } from '../../hooks/usePokemonAutocomplete';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { data: allPokemon } = usePokemonAutocomplete();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputValue.length >= 2 && allPokemon) {
      const filtered = allPokemon
        .filter(p => p.name.includes(inputValue.toLowerCase()))
        .map(p => p.name)
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      // Si el input está vacío, notificamos para limpiar el preview
      if (inputValue === '') {
        onSearch('');
      }
    }
  }, [inputValue, allPokemon, onSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (name: string) => {
    setInputValue(name);
    onSearch(name);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0) {
        e.preventDefault();
        handleSuggestionClick(suggestions[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className={styles.searchContainer} ref={containerRef}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Busca por nombre o ID..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => inputValue.length >= 2 && setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" className={styles.searchButton}>
          Buscar
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((name, index) => (
            <li 
              key={name} 
              className={`${styles.suggestionItem} ${index === selectedIndex ? styles.selected : ''}`}
              onClick={() => handleSuggestionClick(name)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

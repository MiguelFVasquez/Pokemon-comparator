import type { PokemonDetail } from '../../interfaces/Pokemon';
import { usePokemon } from '../../context/PokemonContext';
import styles from './SearchCard.module.css';

interface SearchCardProps {
  pokemon: PokemonDetail;
  onSelect?: () => void;
}

const SearchCard = ({ pokemon, onSelect }: SearchCardProps) => {
  const { 
    pokemonSlot1, 
    pokemonSlot2, 
    setPokemonSlot1, 
    setPokemonSlot2 
  } = usePokemon();

  const handleSelectSlot1 = () => {
    // Lógica de intercambio inteligente:
    // Si el pokemon que quiero poner en Slot 1 ya está en el Slot 2,
    // movemos el que estaba en Slot 1 al Slot 2 (los intercambiamos).
    if (pokemonSlot2 && pokemonSlot2.id === pokemon.id) {
      if (pokemonSlot1) {
        setPokemonSlot2(pokemonSlot1);
      } else {
        setPokemonSlot2(null);
      }
    }
    setPokemonSlot1(pokemon);
    onSelect?.();
  };

  const handleSelectSlot2 = () => {
    // Si el pokemon que quiero poner en Slot 2 ya está en el Slot 1,
    // movemos el que estaba en Slot 2 al Slot 1.
    if (pokemonSlot1 && pokemonSlot1.id === pokemon.id) {
      if (pokemonSlot2) {
        setPokemonSlot1(pokemonSlot2);
      } else {
        setPokemonSlot1(null);
      }
    }
    setPokemonSlot2(pokemon);
    onSelect?.();
  };

  // Usar sprite de pixel para la tarjeta pequeña
  const pixelSprite = pokemon.sprites.front_default || pokemon.sprites.other['official-artwork'].front_default;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={pixelSprite}
          alt={pokemon.name}
          className={styles.image}
        />
      </div>
      <h3 className={styles.name}>{pokemon.name}</h3>
      <div className={styles.types}>
        {pokemon.types.map((typeInfo) => (
          <span key={typeInfo.type.name} className={`${styles.type} ${styles[typeInfo.type.name]}`}>
            {typeInfo.type.name}
          </span>
        ))}
      </div>
      <div className={styles.actions}>
        <button onClick={handleSelectSlot1} className={styles.slotButton}>
          Slot 1
        </button>
        <button onClick={handleSelectSlot2} className={styles.slotButton}>
          Slot 2
        </button>
      </div>
    </div>
  );
};

export default SearchCard;

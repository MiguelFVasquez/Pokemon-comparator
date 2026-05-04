import type { PokemonDetail } from '../../interfaces/Pokemon';
import { usePokemon } from '../../context/PokemonContext';
import styles from './SearchCard.module.css';

interface SearchCardProps {
  pokemon: PokemonDetail;
}

const SearchCard = ({ pokemon }: SearchCardProps) => {
  const { setPokemonSlot1, setPokemonSlot2 } = usePokemon();

  const handleSelectSlot1 = () => {
    setPokemonSlot1(pokemon);
  };

  const handleSelectSlot2 = () => {
    setPokemonSlot2(pokemon);
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

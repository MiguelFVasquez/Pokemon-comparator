import { usePokemon } from './context/PokemonContext';
import SearchFeature from './features/search/SearchFeature';
import StatsChart from './features/comparison/StatsChart';
import AbilitiesList from './features/comparison/AbilitiesList';
import NatureRecommendation from './features/comparison/NatureRecommendation';
import Footer from './components/Footer/Footer';
import styles from './App.module.css';

function App() {
  const { pokemonSlot1, pokemonSlot2, setPokemonSlot1, setPokemonSlot2 } = usePokemon();

  const clearSlot1 = () => setPokemonSlot1(null);
  const clearSlot2 = () => setPokemonSlot2(null);

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleGroup}>
            <h1 className={styles.title}>Comparador Pokémon</h1>
            <p className={styles.subtitle}>Analiza y compara estadísticas de tus Pokémon</p>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.searchSection}>
          <SearchFeature />
        </section>

        <section className={styles.comparisonGrid}>
          {/* Slot 1 (Izquierda) */}
          <div className={`${styles.slot} ${pokemonSlot1 ? styles.hasPokemon : ''}`}>
            <div className={styles.slotHeader}>
              <h2>Slot 1</h2>
              {pokemonSlot1 && (
                <button onClick={clearSlot1} className={styles.removeButton} title="Eliminar">×</button>
              )}
            </div>
            {pokemonSlot1 ? (
              <div className={styles.selectedPokemon}>
                <img 
                  src={pokemonSlot1.sprites.other['official-artwork'].front_default} 
                  alt={pokemonSlot1.name} 
                  className={styles.artwork}
                />
                <p className={styles.pokemonName}>{pokemonSlot1.name}</p>
                
                {/* Lista de Habilidades con Tooltips */}
                <AbilitiesList abilities={pokemonSlot1.abilities} />

                {/* Recomendación de Naturalezas */}
                <NatureRecommendation pokemon={pokemonSlot1} />
              </div>
            ) : (
              <div className={styles.emptySlot}>
                <div className={styles.pokeball}></div>
                <p>Esperando...</p>
              </div>
            )}
          </div>

          {/* Gráfico (Centro) */}
          <div className={styles.chartContainer}>
            {pokemonSlot1 && pokemonSlot2 ? (
              <div className={styles.chartArea}>
                <StatsChart pokemon1={pokemonSlot1} pokemon2={pokemonSlot2} />
                <div className={styles.vsBadge}>VS</div>
              </div>
            ) : (
              <div className={styles.instructionCard}>
                <p>Selecciona dos Pokémon para ver la comparativa</p>
              </div>
            )}
          </div>

          {/* Slot 2 (Derecha) */}
          <div className={`${styles.slot} ${pokemonSlot2 ? styles.hasPokemon : ''}`}>
            <div className={styles.slotHeader}>
              <h2>Slot 2</h2>
              {pokemonSlot2 && (
                <button onClick={clearSlot2} className={styles.removeButton} title="Eliminar">×</button>
              )}
            </div>
            {pokemonSlot2 ? (
              <div className={styles.selectedPokemon}>
                <img 
                  src={pokemonSlot2.sprites.other['official-artwork'].front_default} 
                  alt={pokemonSlot2.name} 
                  className={styles.artwork}
                />
                <p className={styles.pokemonName}>{pokemonSlot2.name}</p>
                
                {/* Lista de Habilidades con Tooltips */}
                <AbilitiesList abilities={pokemonSlot2.abilities} />

                {/* Recomendación de Naturalezas */}
                <NatureRecommendation pokemon={pokemonSlot2} />
              </div>
            ) : (
              <div className={styles.emptySlot}>
                <div className={styles.pokeball}></div>
                <p>Esperando...</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;

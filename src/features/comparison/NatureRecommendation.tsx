import React from 'react';
import type { PokemonDetail } from '../../interfaces/Pokemon';
import { getRecommendedNatures } from './natureUtils';
import styles from './NatureRecommendation.module.css';

interface NatureRecommendationProps {
  pokemon: PokemonDetail;
}

const NatureRecommendation: React.FC<NatureRecommendationProps> = ({ pokemon }) => {
  const stats = pokemon.stats.map(s => ({
    name: s.stat.name,
    value: s.base_stat
  }));

  const recommendedNatures = getRecommendedNatures(stats);

  const formatStatName = (name: string) => {
    const map: Record<string, string> = {
      'attack': 'Ataque',
      'defense': 'Defensa',
      'special-attack': 'Atq. Esp',
      'special-defense': 'Def. Esp',
      'speed': 'Velocidad',
      'hp': 'PS'
    };
    return map[name] || name;
  };

  return (
    <div className={styles.natureContainer}>
      <h3 className={styles.title}>Naturalezas Recomendadas</h3>
      <div className={styles.natureList}>
        {recommendedNatures.map((nature) => (
          <div key={nature.name} className={styles.natureCard}>
            <div className={styles.natureHeader}>
              <span className={styles.natureName}>
                {nature.spanishName} <small>({nature.name})</small>
              </span>
              <div className={styles.statChanges}>
                <span className={styles.increase}>↑ {formatStatName(nature.increasedStat)}</span>
                <span className={styles.decrease}>↓ {formatStatName(nature.decreasedStat)}</span>
              </div>
            </div>
            <div className={styles.mintInfo}>
              <span className={styles.mintIcon}></span>
              Obtenible con: <strong>{nature.mintItem}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NatureRecommendation;

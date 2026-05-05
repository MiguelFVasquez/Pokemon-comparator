import { useAbilityDescription } from '../../hooks/useAbilityDescription';
import styles from './AbilitiesList.module.css';

interface AbilityItemProps {
  name: string;
  url: string;
  isHidden: boolean;
}

const AbilityItem = ({ name, url, isHidden }: AbilityItemProps) => {
  const { data: description, isLoading } = useAbilityDescription(url);

  return (
    <div className={styles.abilityItem}>
      <span className={`${styles.abilityBadge} ${isHidden ? styles.hidden : ''}`}>
        {name.replace('-', ' ')}
        {isHidden && <span className={styles.hiddenLabel}> (Oculta)</span>}
      </span>
      
      <div className={styles.tooltip}>
        <h4 className={styles.tooltipTitle}>{name.toUpperCase()}</h4>
        <p className={styles.tooltipText}>
          {isLoading ? 'Cargando descripción...' : description}
        </p>
      </div>
    </div>
  );
};

interface AbilitiesListProps {
  abilities: {
    ability: { name: string; url: string };
    is_hidden: boolean;
  }[];
}

const AbilitiesList = ({ abilities }: AbilitiesListProps) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Habilidades</h4>
      <div className={styles.list}>
        {abilities.map((item) => (
          <AbilityItem 
            key={item.ability.name} 
            name={item.ability.name} 
            url={item.ability.url} 
            isHidden={item.is_hidden} 
          />
        ))}
      </div>
    </div>
  );
};

export default AbilitiesList;

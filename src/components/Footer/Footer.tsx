import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>
          Datos obtenidos de <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">PokéAPI</a>
        </p>
        <p>
          <a 
            href="https://github.com/MiguelFVasquez/Pokemon-comparator" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            <svg className={styles.icon} width="20" height="20">
              <use href="/icons.svg#github-icon" />
            </svg>
            GitHub Repository
          </a>
        </p>
        <p className={styles.disclaimer}>
          Pokémon y los nombres de los personajes son marcas registradas de Nintendo. 
          Construido con fines educativos.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

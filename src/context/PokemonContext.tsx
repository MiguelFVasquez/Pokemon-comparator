import { createContext, useState, useContext, type ReactNode } from 'react';
import type { PokemonDetail } from '../interfaces/Pokemon';

interface PokemonContextType {
    pokemonSlot1 : PokemonDetail | null;
    pokemonSlot2 : PokemonDetail | null;
    setPokemonSlot1: (pokemon: PokemonDetail | null) => void;
    setPokemonSlot2: (pokemon: PokemonDetail | null) => void;
}

// 2. Creamos el contexto. 
// Usamos export para que otros componentes puedan "escuchar".
export const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

// 3. El Proveedor (La Torre de Radio)
export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [pokemonSlot1, setPokemonSlot1] = useState<PokemonDetail | null>(null);
  const [pokemonSlot2, setPokemonSlot2] = useState<PokemonDetail | null>(null);

  return (
    <PokemonContext.Provider 
      value={{ pokemonSlot1, pokemonSlot2, setPokemonSlot1, setPokemonSlot2 }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

// 4. Hook personalizado (Para evitar errores de "undefined" en tus componentes)
export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon debe usarse dentro de un PokemonProvider');
  }
  return context;
};
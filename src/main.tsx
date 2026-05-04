import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// Importamos el Proveedor para envolver nuestra aplicación y compartir el estado global de los Pokémon.
import { PokemonProvider } from './context/PokemonContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 2. Envolvemos toda la aplicación */}
    <PokemonProvider>
      <App />
    </PokemonProvider>
  </StrictMode>,
)
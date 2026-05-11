# Comparador Pokémon 🔴⚪

Un dashboard interactivo diseñado para entrenadores Pokémon que desean analizar y comparar estadísticas base de diferentes especies de forma visual y detallada.

## Objetivo
El objetivo de este proyecto es proporcionar una herramienta intuitiva y rápida que consuma datos reales de la **PokéAPI** para comparar dos Pokémon. La aplicación facilita la toma de decisiones estratégicas al visualizar las fortalezas y debilidades de cada Pokémon mediante gráficos de radar y análisis de habilidades.

## Características
- **Búsqueda Avanzada**: Autocompletado inteligente para encontrar Pokémon por nombre o ID.
- **Comparativa Visual (Radar Chart)**: Gráfico interactivo que superpone las 6 estadísticas base (HP, Ataque, Defensa, etc.) de ambos Pokémon.
- **Análisis de Habilidades**: Listado detallado de habilidades con descripciones emergentes (tooltips).
- **Recomendación de Naturalezas**: Sugerencias automáticas de las mejores naturalezas para cada Pokémon basadas en sus estadísticas más altas.
- **Diseño Responsive**: Interfaz optimizada para dispositivos móviles y escritorio con una estética inspirada en el universo Pokémon.
- **Estado Global**: Gestión eficiente de los slots de comparación mediante React Context API.

## Tecnologías
- **Frontend**: [React](https://reactjs.org/) (Vite)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Gestión de Datos**: [TanStack Query](https://tanstack.com/query/latest) (React Query) para caching y manejo de estado asíncrono.
- **Visualización**: [Chart.js](https://www.chartjs.org/) con [react-chartjs-2](https://react-charts.js.org/).
- **Estilos**: [CSS Modules](https://github.com/css-modules/css-modules) (Vanilla CSS) para un diseño modular y encapsulado.
- **API**: [PokéAPI](https://pokeapi.co/)

## Créditos y Licencia
- **Datos**: Toda la información de los Pokémon es obtenida de la [PokéAPI](https://pokeapi.co/).
- **Iconos y Arte**: Los sprites y artes oficiales pertenecen a **Nintendo/Creatures Inc./GAME FREAK inc.**
- **Desarrollo**: Creado por [Miguel Florez](https://github.com/MiguelFVasquez) con fines educativos.
- **Licencia**: Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo `LICENCE` para más detalles.

---
*Pokémon y los nombres de los personajes son marcas registradas de Nintendo. Este proyecto no está afiliado con Nintendo.*

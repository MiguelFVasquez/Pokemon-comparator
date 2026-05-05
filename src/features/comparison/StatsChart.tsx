import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import type { PokemonDetail } from '../../interfaces/Pokemon';
import styles from './Comparison.module.css';

// Registrar componentes de Chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface StatsChartProps {
  pokemon1: PokemonDetail;
  pokemon2: PokemonDetail;
}

// Mapa de colores por tipo de Pokémon
const typeColors: Record<string, { bg: string, border: string }> = {
  fire: { bg: 'rgba(240, 128, 48, 0.4)', border: '#F08030' },
  water: { bg: 'rgba(104, 144, 240, 0.4)', border: '#6890F0' },
  grass: { bg: 'rgba(120, 200, 80, 0.4)', border: '#78C850' },
  electric: { bg: 'rgba(248, 208, 48, 0.4)', border: '#F8D030' },
  ice: { bg: 'rgba(152, 216, 216, 0.4)', border: '#98D8D8' },
  fighting: { bg: 'rgba(192, 48, 40, 0.4)', border: '#C03028' },
  poison: { bg: 'rgba(160, 64, 160, 0.4)', border: '#A040A0' },
  ground: { bg: 'rgba(224, 192, 104, 0.4)', border: '#E0C068' },
  flying: { bg: 'rgba(168, 144, 240, 0.4)', border: '#A890F0' },
  psychic: { bg: 'rgba(248, 88, 136, 0.4)', border: '#F85888' },
  bug: { bg: 'rgba(168, 184, 32, 0.4)', border: '#A8B820' },
  rock: { bg: 'rgba(184, 160, 56, 0.4)', border: '#B8A038' },
  ghost: { bg: 'rgba(112, 88, 152, 0.4)', border: '#705898' },
  dragon: { bg: 'rgba(112, 56, 248, 0.4)', border: '#7038F8' },
  dark: { bg: 'rgba(112, 88, 72, 0.4)', border: '#705848' },
  steel: { bg: 'rgba(184, 184, 208, 0.4)', border: '#B8B8D0' },
  fairy: { bg: 'rgba(238, 153, 172, 0.4)', border: '#EE99AC' },
  normal: { bg: 'rgba(168, 168, 120, 0.4)', border: '#A8A878' },
};

const StatsChart = ({ pokemon1, pokemon2 }: StatsChartProps) => {
  const labels = pokemon1.stats.map(s => s.stat.name.toUpperCase());

  // Obtener colores basados en el primer tipo
  const color1 = typeColors[pokemon1.types[0].type.name] || typeColors.normal;
  const color2 = typeColors[pokemon2.types[0].type.name] || typeColors.normal;

  // Ajuste por si son el mismo tipo/color
  const finalColor2 = color1.border === color2.border 
    ? { bg: 'rgba(51, 51, 51, 0.4)', border: '#333333' } 
    : color2;

  const data: ChartData<'radar'> = {
    labels,
    datasets: [
      {
        label: pokemon1.name.toUpperCase(),
        data: pokemon1.stats.map(s => s.base_stat),
        backgroundColor: color1.bg,
        borderColor: color1.border,
        borderWidth: 3,
        pointBackgroundColor: color1.border,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: color1.border,
      },
      {
        label: pokemon2.name.toUpperCase(),
        data: pokemon2.stats.map(s => s.base_stat),
        backgroundColor: finalColor2.bg,
        borderColor: finalColor2.border,
        borderWidth: 3,
        pointBackgroundColor: finalColor2.border,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: finalColor2.border,
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    scales: {
      r: {
        angleLines: { display: true, color: 'rgba(0,0,0,0.1)' },
        suggestedMin: 0,
        suggestedMax: 150,
        ticks: { display: false },
        pointLabels: {
          font: {
            family: "'Luckiest Guy', cursive",
            size: 12,
          },
          color: '#3b4cca'
        }
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: "'Luckiest Guy', cursive",
            size: 16,
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#3b4cca',
        bodyColor: '#333',
        borderColor: '#3b4cca',
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        callbacks: {
          title: (items) => items[0].label,
        }
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.chartWrapper}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default StatsChart;

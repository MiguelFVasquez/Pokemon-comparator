export interface NatureInfo {
  name: string;
  spanishName: string;
  increasedStat: string;
  decreasedStat: string;
  mintItem: string;
}

export const NATURES: NatureInfo[] = [
  { name: 'Adamant', spanishName: 'Firme', increasedStat: 'attack', decreasedStat: 'special-attack', mintItem: 'Adamant Mint' },
  { name: 'Jolly', spanishName: 'Alegre', increasedStat: 'speed', decreasedStat: 'special-attack', mintItem: 'Jolly Mint' },
  { name: 'Modest', spanishName: 'Modesta', increasedStat: 'special-attack', decreasedStat: 'attack', mintItem: 'Modest Mint' },
  { name: 'Timid', spanishName: 'Miedosa', increasedStat: 'speed', decreasedStat: 'attack', mintItem: 'Timid Mint' },
  { name: 'Bold', spanishName: 'Osada', increasedStat: 'defense', decreasedStat: 'attack', mintItem: 'Bold Mint' },
  { name: 'Impish', spanishName: 'Agitada', increasedStat: 'defense', decreasedStat: 'special-attack', mintItem: 'Impish Mint' },
  { name: 'Calm', spanishName: 'Serena', increasedStat: 'special-defense', decreasedStat: 'attack', mintItem: 'Calm Mint' },
  { name: 'Careful', spanishName: 'Cauta', increasedStat: 'special-defense', decreasedStat: 'special-attack', mintItem: 'Careful Mint' },
  { name: 'Brave', spanishName: 'Audaz', increasedStat: 'attack', decreasedStat: 'speed', mintItem: 'Brave Mint' },
  { name: 'Quiet', spanishName: 'Mansa', increasedStat: 'special-attack', decreasedStat: 'speed', mintItem: 'Quiet Mint' },
  { name: 'Relaxed', spanishName: 'Plácida', increasedStat: 'defense', decreasedStat: 'speed', mintItem: 'Relaxed Mint' },
  { name: 'Sassy', spanishName: 'Grosera', increasedStat: 'special-defense', decreasedStat: 'speed', mintItem: 'Sassy Mint' },
];

export const getRecommendedNatures = (stats: { name: string; value: number }[]): NatureInfo[] => {
  const getStat = (name: string) => stats.find(s => s.name === name)?.value || 0;

  const atk = getStat('attack');
  const spAtk = getStat('special-attack');
  const speed = getStat('speed');
  const def = getStat('defense');
  const spDef = getStat('special-defense');

  const recommendations: NatureInfo[] = [];

  // Offensive recommendations
  if (speed > 110 && (speed > atk || speed > spAtk)) {
    // High speed Pokémon
    if (atk > spAtk) {
      recommendations.push(NATURES.find(n => n.name === 'Jolly')!);
      recommendations.push(NATURES.find(n => n.name === 'Adamant')!);
    } else {
      recommendations.push(NATURES.find(n => n.name === 'Timid')!);
      recommendations.push(NATURES.find(n => n.name === 'Modest')!);
    }
  } else if (atk > spAtk) {
    recommendations.push(NATURES.find(n => n.name === 'Adamant')!);
    recommendations.push(NATURES.find(n => n.name === 'Jolly')!);
  } else {
    recommendations.push(NATURES.find(n => n.name === 'Modest')!);
    recommendations.push(NATURES.find(n => n.name === 'Timid')!);
  }

  // Defensive/Tank recommendations if stats are high
  if (def > 100 || spDef > 100) {
    if (def >= spDef) {
      const bestDefNature = atk > spAtk ? 'Impish' : 'Bold';
      recommendations.push(NATURES.find(n => n.name === bestDefNature)!);
    } else {
      const bestSpDefNature = atk > spAtk ? 'Careful' : 'Calm';
      recommendations.push(NATURES.find(n => n.name === bestSpDefNature)!);
    }
  }

  // Deduplicate and limit
  return Array.from(new Set(recommendations)).slice(0, 3);
};

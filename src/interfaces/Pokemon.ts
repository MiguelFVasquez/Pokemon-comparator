export interface BaseStat{
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface PokemonType{
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonDetail{
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            }   
        };
    };
    types: PokemonType[];
    stats: BaseStat[];      
}

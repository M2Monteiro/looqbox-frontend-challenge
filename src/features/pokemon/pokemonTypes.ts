export interface Pokemons {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: PokemonSprites;
  stats: PokemonStats[];
  types: PokemonTypes[];
}

interface PokemonSprites {
  back_default: string;
  front_default: string;
  front_shiny: string;
  other: {
    'official-artwork': {
      front_default: string;
      front_shiny: string;
    };
    showdown: {
      back_default: string;
      front_default: string;
      front_shiny: string;
    };
  };
}
interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface PokemonTypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export type PokemonListItem = Pokemons['results'][number];

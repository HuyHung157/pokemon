export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    other: {
      showdown: {
        front_default: string;
      };
    };
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface PokemonTypeResponse {
  count: number;
  results: PokemonType[];
}

export interface PokemonByTypeResponse {
  pokemon: Array<{
    pokemon: PokemonListItem;
    slot: number;
  }>;
}

export interface PokemonByTypeItem {
  pokemon: PokemonListItem;
  slot: number;
}

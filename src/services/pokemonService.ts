
import axiosClient from '@/lib/axiosClient';
import {
  PokemonListResponse,
  PokemonTypeResponse,
  PokemonDetail,
  PokemonByTypeResponse,
} from '@/types/pokemon.types';

export const pokemonService = {
  /**
   * Get paginated list of Pokemon
   */
  async getList(limit: number, offset: number): Promise<PokemonListResponse> {
    const response = await axiosClient.get<PokemonListResponse>(
      `/pokemon?limit=${limit}&offset=${offset}`
    );
    return response.data;
  },

  /**
   * Get all available Pokemon types
   */
  async getTypes(): Promise<PokemonTypeResponse> {
    const response = await axiosClient.get<PokemonTypeResponse>('/type');
    return response.data;
  },

  /**
   * Get Pokemon detail by URL
   */
  async getDetail(url: string): Promise<PokemonDetail> {
    const response = await axiosClient.get<PokemonDetail>(url);
    return response.data;
  },

  /**
   * Get Pokemon by specific type
   */
  async getByType(type: string): Promise<PokemonByTypeResponse> {
    const response = await axiosClient.get<PokemonByTypeResponse>(`/type/${type}`);
    return response.data;
  },
} as const;
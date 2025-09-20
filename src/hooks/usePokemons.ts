import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import { pokemonService } from "@/services/pokemonService";
import { PokemonByTypeItem, PokemonDetail } from "@/types/pokemon.types";
import { APP_CONFIG, QUERY_KEYS } from "@/lib/const";

const PAGE_SIZE = APP_CONFIG.PAGE_SIZE;

export const usePokemonDetail = (
  url: string
): UseQueryResult<PokemonDetail, Error> => {
  return useQuery<PokemonDetail, Error>({
    queryKey: [QUERY_KEYS.POKEMON.DETAIL, url],
    queryFn: () => pokemonService.getDetail(url),
    staleTime: APP_CONFIG.CACHE_TIME.MEDIUM,
    enabled: !!url,
  });
};

export const usePokemonList = (page: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POKEMON.LIST, page],
    queryFn: async () => {
      const offset = PAGE_SIZE * (page - 1);
      const list = await pokemonService.getList(PAGE_SIZE, offset);
      return {
        results: list.results,
        total: list.count,
      };
    },
    staleTime: APP_CONFIG.CACHE_TIME.MEDIUM,
  });
};

export const usePokemonByTypes = (types: string[]) => {
  const queries = useQueries({
    queries: types.map((type) => ({
      queryKey: [QUERY_KEYS.POKEMON.BY_TYPE, type],
      queryFn: () => pokemonService.getByType(type),
      staleTime: APP_CONFIG.CACHE_TIME.MEDIUM,
      enabled: !!type,
    })),
  });

  const hashmap: Record<string, PokemonByTypeItem[]> = {};
  queries.forEach((q, idx) => {
    if (q.data) {
      hashmap[types[idx]] = q.data.pokemon;
    }
  });

  let common: PokemonByTypeItem[] = [];
  if (types.length > 0) {
    const listArrays = types.map((t) => hashmap[t] || []);
    common = listArrays.reduce((acc, arr) => {
      if (acc.length === 0) return arr;
      const accIds = new Set(acc.map((p: PokemonByTypeItem) => p.pokemon.name));
      return arr.filter((p: PokemonByTypeItem) => accIds.has(p.pokemon.name));
    }, []);
  }

  return {
    results: common,
    total: common.length,
  };
};

export const useTypes = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TYPES],
    queryFn: pokemonService.getTypes,
  });
};

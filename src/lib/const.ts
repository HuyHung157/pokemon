
export const APP_CONFIG = {
  PAGE_SIZE: Number(process.env.NEXT_PUBLIC_PAGE_SIZE) || 24,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE || 'https://pokeapi.co/api/v2',
  CACHE_TIME: {
    SHORT: 1000 * 60 * 2, // 2 minutes
    MEDIUM: 1000 * 60 * 5, // 5 minutes
    LONG: 1000 * 60 * 10, // 10 minutes
  }
} as const;

export const ROUTES = {
  HOME: '/',
  POKEMON: '/pokemon',
} as const;

export const QUERY_KEYS = {
  POKEMON: {
    LIST: 'pokemon-list',
    DETAIL: 'pokemon-detail',
    BY_TYPE: 'pokemon-by-type',
  },
  TYPES: 'types',
} as const;
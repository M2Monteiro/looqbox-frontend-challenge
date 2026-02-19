import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  loadFromStorage,
  saveToStorage,
  removeFromStorage,
} from '@/utils/storage';

import type { RootState } from '@/app/store';
import * as service from './pokemonService';
import type {
  Pokemon,
  PokemonListItem,
  Pokemons,
  PokemonTypeResponse,
} from './pokemonTypes';

const persistedCache =
  loadFromStorage<Record<string, any>>('pokemon-cache') || {};

const persistedList = loadFromStorage<any[]>('pokemon-list') || [];

interface PokemonState {
  list: PokemonListItem[];
  cache: Record<string, Pokemon>;
  selected: Pokemon | null;
  typeFilter: string | null;
  filteredByType: PokemonListItem[];
  typeDetails: PokemonTypeResponse | null;
  loadingList: boolean;
  loadingDetails: boolean;
  error: string | null;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
    currentPage: number;
    pageSize: number;
  };
}

const initialState: PokemonState = {
  list: persistedList,
  cache: persistedCache,
  selected: null,
  typeFilter: null,
  filteredByType: [],
  typeDetails: null,
  loadingList: false,
  loadingDetails: false,
  error: null,
  pagination: {
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
    pageSize: 10,
  },
};

// LISTA
export const fetchPokemons = createAsyncThunk<
  Pokemons,
  { limit?: number; offset?: number } | void
>('pokemon/fetchAll', async (params) => {
  const limit = typeof params === 'object' && params?.limit ? params.limit : 10;
  const offset =
    typeof params === 'object' && params?.offset ? params.offset : 0;
  return await service.getPokemons(limit, offset);
});

// DETALHE COM CACHE
export const fetchPokemonByName = createAsyncThunk<Pokemon, string>(
  'pokemon/fetchByName',
  async (name: string, { getState }) => {
    const state = getState() as RootState;

    const cached = state.pokemon.cache[name];

    if (cached) {
      return cached;
    }

    return await service.getPokemonByName(name);
  }
);

// DETALHE DO TYPE DO POKEMON
export const fetchPokemonsByType = createAsyncThunk(
  'pokemon/fetchByType',
  async (type: string) => {
    return await service.getTypeById(type);
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    clearSelected(state) {
      state.selected = null;
    },
    clearCache(state) {
      state.cache = {};
      removeFromStorage('pokemon-cache');
    },
    clearTypeFilter(state) {
      state.typeFilter = null;
      state.filteredByType = [];
      state.typeDetails = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // LISTA
      .addCase(fetchPokemons.pending, (state) => {
        state.loadingList = true;
        state.error = null;
      })

      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload.results;

        state.pagination.count = action.payload.count;
        state.pagination.next = action.payload.next;
        state.pagination.previous = action.payload.previous;

        if (action.payload.previous === null) {
          state.pagination.currentPage = 1;
        } else {
          const url = new URL(
            action.payload.next || action.payload.previous || ''
          );
          const offset = parseInt(url.searchParams.get('offset') || '0');
          state.pagination.currentPage =
            Math.floor(offset / state.pagination.pageSize) + 1;
        }

        // saveToStorage('pokemon-list', state.list);
      })

      .addCase(fetchPokemons.rejected, (state) => {
        state.loadingList = false;
        state.error = 'Erro ao buscar pokémons';
      })

      // DETALHE
      .addCase(fetchPokemonByName.pending, (state) => {
        state.loadingDetails = true;
        state.error = null;
      })

      .addCase(fetchPokemonByName.fulfilled, (state, action) => {
        const pokemon = action.payload;

        state.loadingDetails = false;
        state.selected = pokemon;
        state.cache[pokemon.name] = pokemon;

        const alreadyInList = state.list.some((p) => p.name === pokemon.name);
        if (!alreadyInList) {
          state.list.push({
            name: pokemon.name,
            url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
          });
          // saveToStorage('pokemon-list', state.list);
        }

        saveToStorage('pokemon-cache', state.cache);
      })

      .addCase(fetchPokemonByName.rejected, (state) => {
        state.loadingDetails = false;
        state.error = 'Erro ao buscar Pokémon';
      })

      // Types
      .addCase(fetchPokemonsByType.pending, (state) => {
        state.loadingList = true;
        state.error = null;
      })
      .addCase(fetchPokemonsByType.fulfilled, (state, action) => {
        state.loadingList = false;

        state.typeDetails = action.payload;
        state.filteredByType = action.payload.pokemon.map((p: any) => ({
          name: p.pokemon.name,
          url: p.pokemon.url,
        }));
        state.typeFilter = action.meta.arg;
      })
      .addCase(fetchPokemonsByType.rejected, (state) => {
        state.loadingList = false;
        state.error = 'Erro ao buscar pokémons por tipo';
      });
  },
});

export const { clearSelected, clearCache, clearTypeFilter } =
  pokemonSlice.actions;

export default pokemonSlice.reducer;

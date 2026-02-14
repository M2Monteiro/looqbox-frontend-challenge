import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  loadFromStorage,
  saveToStorage,
  removeFromStorage,
} from '@/utils/storage';

import type { RootState } from '@/app/store';
import * as service from './pokemonService';
import type { Pokemon } from './pokemonTypes';

const persistedCache =
  loadFromStorage<Record<string, any>>('pokemon-cache') || {};

const persistedList = loadFromStorage<any[]>('pokemon-list') || [];

interface PokemonState {
  list: Pokemon[];
  cache: Record<string, Pokemon>;
  selected: Pokemon | null;
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  list: persistedList,
  cache: persistedCache,
  selected: null,
  loading: false,
  error: null,
};

// LISTA
export const fetchPokemons = createAsyncThunk('pokemon/fetchAll', async () => {
  return await service.getPokemons();
});

// DETALHE COM CACHE
export const fetchPokemonByName = createAsyncThunk(
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
  },

  extraReducers: (builder) => {
    builder

      // LISTA
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.results;

        saveToStorage('pokemon-list', state.list);
      })

      .addCase(fetchPokemons.rejected, (state) => {
        state.loading = false;
        state.error = 'Erro ao buscar pokémons';
      })

      // DETALHE
      .addCase(fetchPokemonByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPokemonByName.fulfilled, (state, action) => {
        const pokemon = action.payload;

        state.loading = false;
        state.selected = pokemon;
        state.cache[pokemon.name] = pokemon;

        saveToStorage('pokemon-cache', state.cache);
      })

      .addCase(fetchPokemonByName.rejected, (state) => {
        state.loading = false;
        state.error = 'Erro ao buscar Pokémon';
      });
  },
});

export const { clearSelected } = pokemonSlice.actions;
export const { clearCache } = pokemonSlice.actions;

export default pokemonSlice.reducer;

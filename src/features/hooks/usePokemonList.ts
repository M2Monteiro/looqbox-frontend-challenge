import { useEffect, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { fetchPokemonByName, fetchPokemons } from '../pokemon/pokemonSlice';
import type { PokemonListItem } from '../pokemon/pokemonTypes';

function filterPokemons(
  list: PokemonListItem[],
  search: string
): PokemonListItem[] {
  if (!search.trim()) return list;

  const term = search.toLowerCase().trim();

  return list.filter((p) => {
    const nameMatch = p.name.toLowerCase().includes(term);
    const id = p.url.split('/').filter(Boolean).pop() ?? '';
    const idMatch = id === term;

    return nameMatch || idMatch;
  });
}

export function usePokemonList() {
  const [search, setSearch] = useState('');

  const dispatch = useAppDispatch();
  const { list, loadingList, error } = useAppSelector((state) => state.pokemon);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchPokemons());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!search.trim()) return;

    const term = search.toLowerCase().trim();
    const found = list.some((p) => {
      const id = p.url.split('/').filter(Boolean).pop() ?? '';
      return p.name.toLowerCase().includes(term) || id === term;
    });

    if (!found) {
      const debounce = setTimeout(() => {
        dispatch(fetchPokemonByName(term));
      }, 500); // aguarda o usuário parar de digitar

      return () => clearTimeout(debounce);
    }
  }, [search, list, dispatch]);

  const filteredList = useMemo(
    () => filterPokemons(list, search),
    [list, search]
  );

  return {
    list: filteredList,
    loadingList,
    error,
    search,
    setSearch,
  };
}

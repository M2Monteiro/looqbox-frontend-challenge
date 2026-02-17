import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect, useMemo, useState } from 'react';
import { fetchPokemons } from '../pokemon/pokemonSlice';
import type { Pokemons } from '../pokemon/pokemonTypes';

function filterPokemons(list: Pokemons[], search: string): Pokemons[] {
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
  const { list, loading, error } = useAppSelector((state) => state.pokemon);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchPokemons());
    }
  }, []);

  const filteredList = useMemo(
    () => filterPokemons(list, search),
    [list, search]
  );

  return {
    list: filteredList,
    loading,
    error,
    search,
    setSearch,
  };
}

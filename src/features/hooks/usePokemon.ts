import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useState } from 'react';
import type { Pokemon } from '../pokemon/pokemonTypes';
import { fetchPokemonByName } from '../pokemon/pokemonSlice';

export function usePokemon() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { cache } = useAppSelector((state) => state.pokemon);

  const fetchPokemonDetails = async (name: string) => {
    try {
      setModalOpen(true);
      setLoading(true);
      const cachedPokemon = cache[name];
      if (cachedPokemon) {
        setPokemon(cachedPokemon);
        return;
      }

      const result = await dispatch(fetchPokemonByName(name)).unwrap();
      setPokemon(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setPokemon(null);
  };

  return { pokemon, loading, modalOpen, fetchPokemonDetails, closeModal };
}

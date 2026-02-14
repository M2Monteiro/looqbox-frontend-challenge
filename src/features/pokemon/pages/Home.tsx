import { useAppDispatch, useAppSelector } from '@/app/hook';
import { PokemonCard } from '../components/PokemonCard';
import { PokemonNavBar } from '../components/PokemonNavBar';
import { useEffect } from 'react';
import { fetchPokemons } from '../pokemonSlice';

export function PokemonHomePage() {
  const dispatch = useAppDispatch();

  const { list, loading, error } = useAppSelector((state) => state.pokemon);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchPokemons());
    }
  }, []);

  if (loading) {
    return <p>Carregando pokémons...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <PokemonNavBar />
      <div className="pokemon-grid">
        {list.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>
    </>
  );
}

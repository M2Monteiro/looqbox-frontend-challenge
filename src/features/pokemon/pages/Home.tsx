import { PokemonCard } from '../components/PokemonCard';
import { PokemonNavBar } from '../components/PokemonNavBar';
import { Pagination, Row, type PaginationProps } from 'antd';
import { usePokemon } from '@/features/hooks/usePokemon';
import { PokemonModal } from '../components/PokemonModal';
import { usePokemonList } from '@/features/hooks/usePokemonList';

export function PokemonHomePage() {
  const { list: pokemons, loading, error, search, setSearch } =
    usePokemonList();

  const {
    pokemon,
    loading: loadingDetails,
    modalOpen,
    fetchPokemonDetails,
    closeModal,
  } = usePokemon();

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize
  ) => {
    console.log(current, pageSize);
  };

  return (
    <>
      <PokemonNavBar search={search} onSearch={setSearch} />

      <Row justify="space-around">
        {pokemons.map((p) => (
          <PokemonCard
            key={p.name}
            name={p.name}
            url={p.url}
            onOpenDetails={fetchPokemonDetails}
          />
        ))}
      </Row>

      <PokemonModal
        open={modalOpen}
        loading={loadingDetails}
        pokemon={pokemon}
        onClose={closeModal}
      />

      <Pagination
        align="center"
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={1}
        total={100}
      />
    </>
  );
}

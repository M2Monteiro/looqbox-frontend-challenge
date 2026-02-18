import { Divider, Flex, Modal, Spin, Tag, Image } from 'antd';

import type { Pokemon } from '../pokemonTypes';

const typeColors: Record<string, string> = {
  fire: '#FF6B35',
  water: '#4FC3F7',
  grass: '#66BB6A',
  electric: '#FFD600',
  psychic: '#F48FB1',
  ice: '#80DEEA',
  dragon: '#7E57C2',
  dark: '#546E7A',
  fairy: '#F06292',
  normal: '#BCAAA4',
  fighting: '#EF5350',
  flying: '#90CAF9',
  poison: '#AB47BC',
  ground: '#FFA726',
  rock: '#8D6E63',
  bug: '#9CCC65',
  ghost: '#7C4DFF',
  steel: '#78909C',
};

interface PokemonModalProps {
  open: boolean;
  loading: boolean;
  pokemon: Pokemon | null;
  onClose: () => void;
}

export function PokemonModal({
  open,
  loading,
  pokemon,
  onClose,
}: PokemonModalProps) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon?.id}.gif`;
  return (
    <Modal
      open={open}
      onCancel={onClose}
      centered
      mask={{ blur: true }}
      footer={null}
      title={
        <span style={{ textTransform: 'capitalize', fontSize: 18 }}>
          {loading ? <span> </span> : `#${pokemon?.id} - ${pokemon?.name}`}
        </span>
      }
    >
      {loading || !pokemon ? (
        <Flex justify="center" style={{ padding: 40 }}>
          <Spin size="large" />
        </Flex>
      ) : (
        <Flex vertical align="center" gap={12}>
          {/* Imagem */}
          <Image
            width={120}
            src={imageUrl}
            alt={pokemon.name}
            preview={false}
          />

          {/* Tipos */}
          <Flex gap={8}>
            {pokemon.types.map((type) => (
              <Tag
                key={type.type.name}
                color={typeColors[type.type.name]}
                style={{ fontWeight: 'bold', textTransform: 'capitalize' }}
              >
                {type.type.name}
              </Tag>
            ))}
          </Flex>

          <Divider style={{ margin: '8px 0' }} />

          {/* Altura e Peso */}
          <Flex gap={32}>
            <Flex vertical align="center">
              <span style={{ color: '#888', fontSize: 12 }}>Altura</span>
              <strong>{(pokemon.height / 10).toFixed(1)}m</strong>
            </Flex>
            <Flex vertical align="center">
              <span style={{ color: '#888', fontSize: 12 }}>Peso</span>
              <strong>{(pokemon.weight / 10).toFixed(1)}kg</strong>
            </Flex>
          </Flex>

          <Divider style={{ margin: '8px 0' }} />

          {/* Stats */}
          <Flex vertical style={{ width: '100%' }} gap={6}>
            {pokemon.stats.map((stat) => (
              <Flex key={stat.effort} justify="space-between">
                <span
                  style={{
                    color: '#888',
                    textTransform: 'capitalize',
                    fontSize: 13,
                  }}
                >
                  {stat.effort}
                </span>
                {/* <strong>{stat.value}</strong> */}
              </Flex>
            ))}
          </Flex>
        </Flex>
      )}
    </Modal>
  );
}

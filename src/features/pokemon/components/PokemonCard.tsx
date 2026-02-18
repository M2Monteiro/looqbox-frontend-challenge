import { usePokemon } from '@/features/hooks/usePokemon';
import { Image, Card, Flex, Typography, Row } from 'antd';
import { useState } from 'react';
import type { Pokemon } from '../pokemonTypes';

const { Text } = Typography;

interface Props {
  name: string;
  url: string;
  onOpenDetails: (id: string) => void;
}

export function PokemonCard({ name, url, onOpenDetails }: Props) {
  const id = url.split('/').filter(Boolean).pop();
  const [imageUrl, setImageUrl] = useState(
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`
  );

  const handleImageError = () => {
    setImageUrl(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    );
  };

  return (
    <Card
      onClick={() => {
        onOpenDetails(id!);
      }}
      hoverable
      style={{
        marginBottom: 8,
        background: 'linear-gradient(145deg, rgb(17, 17, 17), rgb(22, 22, 37))',
        cursor: 'pointer',
        border: 'none',
      }}
    >
      <Flex
        gap={2}
        align="center"
        justify="end"
        style={{ padding: '20px 16px' }}
        vertical
      >
        <Image
          width={100}
          src={imageUrl}
          alt={`pokemon ${name}`}
          preview={false}
          onError={handleImageError}
        />
        <Row align="bottom">
          <Text style={{ color: '#fff', marginRight: 12 }}>#{id}</Text>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>
            {name}
          </Text>
        </Row>
      </Flex>
    </Card>
  );
}

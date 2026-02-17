import { Image, Card, Flex, Typography } from 'antd';

const { Text } = Typography;

interface Props {
  name: string;
  url: string;
  onOpenDetails: (id: string) => void;
}

export function PokemonCard({ name, url, onOpenDetails }: Props) {
  const id = url.split('/').filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;

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
      }}
    >
      <Flex gap={2} align="center" style={{ padding: '20px 16px' }} vertical>
        <Image
          width={100}
          src={imageUrl}
          alt={`pokemon ${name}`}
          preview={false}
        />
        <Text>#{id}</Text>
        <Text>{name}</Text>
      </Flex>
    </Card>
  );
}

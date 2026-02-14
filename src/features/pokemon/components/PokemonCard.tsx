import { Avatar, Card } from 'antd';

interface Props {
  name: string;
}

export function PokemonCard({ name }: Props) {
  return (
    <Card hoverable style={{ width: 200, background: 'red' }}>
      <Avatar src="https://i.pravatar.cc/150?img=3" size="large" />

      <p>id</p>
      <p>{name}</p>
      <p>Tipo</p>
    </Card>
  );
}

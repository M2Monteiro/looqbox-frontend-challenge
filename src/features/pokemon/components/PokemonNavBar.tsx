import { SearchOutlined } from '@ant-design/icons';
import { Col, Input, Row } from 'antd';

export function PokemonNavBar() {
  return (
    <nav>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg, #EF5350 50%, #fff 50%)',
                    border: '3px solid #333',
                    position: 'relative',
                    animation: 'glow 2s ease-in-out infinite',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#fff',
                      border: '2px solid #333',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: 22,
                    fontWeight: 'bold',
                    letterSpacing: 2,
                    color: '#fff',
                    textShadow: '0 0 30px rgba(255,214,0,0.5)',
                  }}
                >
                  POKÉDEX
                </span>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: '#444',
                  fontFamily: "'Courier New', monospace",
                  letterSpacing: 2,
                  marginTop: 2,
                }}
              >
                KANTO REGION • GEN I
              </div>
            </div>
          </div>
        </Col>

        <Col className="gutter-row" span={16}>
          <Input
            size="large"
            placeholder="Buscar por nome ou id..."
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>
      <div>Tipo pokemon</div>

      <div className="w-full h-px bg-gray-700"></div>
    </nav>
  );
}

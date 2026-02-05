import React from 'react';

const MarketHeatmap = () => {
  // Mock heatmap data
  const sectors = [
    { name: 'IT', change: 2.5, size: 'large' },
    { name: 'Banking', change: -1.2, size: 'large' },
    { name: 'Auto', change: 3.8, size: 'medium' },
    { name: 'Pharma', change: 1.5, size: 'medium' },
    { name: 'FMCG', change: -0.5, size: 'small' },
    { name: 'Energy', change: 4.2, size: 'medium' },
    { name: 'Metals', change: -2.8, size: 'small' },
    { name: 'Realty', change: 1.8, size: 'small' },
  ];

  const getColor = (change) => {
    if (change > 3) return '#06d6a0';
    if (change > 1) return '#48bb78';
    if (change > -1) return '#ffc107';
    if (change > -3) return '#fc8181';
    return '#ef476f';
  };

  const getSize = (size) => {
    switch (size) {
      case 'large':
        return { width: '100%', height: '200px' };
      case 'medium':
        return { width: '48%', height: '150px' };
      case 'small':
        return { width: '48%', height: '120px' };
      default:
        return { width: '100%', height: '150px' };
    }
  };

  return (
    <div data-testid="heatmap-screen">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800' }}>Market Heatmap</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginTop: '8px' }}>
          Sector-wise performance overview
        </p>
      </div>

      {/* Heatmap */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {sectors.map((sector) => (
          <div
            key={sector.name}
            style={{
              ...getSize(sector.size),
              background: getColor(sector.change),
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
            data-testid={`sector-${sector.name}`}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.2)',
                backdropFilter: 'blur(4px)',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px', color: '#ffffff' }}>
                {sector.name}
              </div>
              <div style={{ fontSize: '32px', fontWeight: '900', color: '#ffffff' }}>
                {sector.change > 0 ? '+' : ''}
                {sector.change.toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketHeatmap;

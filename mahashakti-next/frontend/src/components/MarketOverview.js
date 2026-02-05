import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MarketOverview = ({ indices }) => {
  return (
    <div className="market-overview" style={{ marginBottom: '24px' }} data-testid="market-overview">
      <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>Market Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        {indices.map((index) => (
          <div key={index.symbol} className="glass-card" data-testid={`index-card-${index.symbol}`}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>
              {index.name}
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
              {index.ltp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '14px',
                color: index.change >= 0 ? '#06d6a0' : '#ef476f',
              }}
              data-testid={`index-change-${index.symbol}`}
            >
              {index.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>
                {index.change >= 0 ? '+' : ''}
                {index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketOverview;

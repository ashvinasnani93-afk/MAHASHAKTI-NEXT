import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { marketAPI } from '../services/api';
import SignalBadge from '../components/SignalBadge';
import { TrendingUp, Zap, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

const Movers = () => {
  const [movers, setMovers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minChange, setMinChange] = useState(15);
  const [maxChange, setMaxChange] = useState(20);

  useEffect(() => {
    loadMovers();
  }, [minChange, maxChange]);

  const loadMovers = async () => {
    try {
      setLoading(true);
      const response = await marketAPI.getMovers(minChange, maxChange);
      if (response.data.success) {
        setMovers(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to load big movers');
      console.error('Movers error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div className="spinner"></div>
        <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.6)' }}>Scanning big movers...</p>
      </div>
    );
  }

  return (
    <div data-testid="movers-screen">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>
          <Zap size={32} style={{ display: 'inline', marginRight: '8px', color: '#ffc107' }} />
          Big Movers (15-20%)
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
          Stocks with explosive 15-20% daily moves
        </p>
      </div>

      {/* Filter Controls */}
      <div
        className="glass-card"
        style={{
          marginBottom: '24px',
          background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%)',
          border: '1px solid rgba(255, 193, 7, 0.3)',
        }}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px', display: 'block' }}>
              Min Change (%)
            </label>
            <input
              type="number"
              value={minChange}
              onChange={(e) => setMinChange(parseFloat(e.target.value))}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
              }}
            />
          </div>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px', display: 'block' }}>
              Max Change (%)
            </label>
            <input
              type="number"
              value={maxChange}
              onChange={(e) => setMaxChange(parseFloat(e.target.value))}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
              }}
            />
          </div>
          <button
            onClick={loadMovers}
            style={{
              padding: '10px 24px',
              background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#000000',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            Apply Filter
          </button>
        </div>
      </div>

      {/* Stats Card */}
      <div className="glass-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#ffc107' }}>{movers.length}</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Total Movers</div>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#06d6a0' }}>
              {movers.filter((m) => m.signal.includes('BUY')).length}
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Buy Signals</div>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#667eea' }}>
              {Math.max(...movers.map((m) => m.changePercent), 0).toFixed(1)}%
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Biggest Move</div>
          </div>
        </div>
      </div>

      {/* Movers List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {movers.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
            <Zap size={48} style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '16px' }} />
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>No big movers found in selected range</p>
          </div>
        ) : (
          movers.map((stock, index) => (
            <Link
              to={`/symbol/${stock.symbol}`}
              key={stock.symbol}
              style={{ textDecoration: 'none' }}
              data-testid={`mover-${stock.symbol}`}
            >
              <div
                className="glass-card"
                style={{
                  borderLeft: `4px solid ${stock.changePercent >= 18 ? '#ffc107' : '#06d6a0'}`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Background gradient based on change */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '40%',
                    height: '100%',
                    background: `linear-gradient(90deg, transparent 0%, ${stock.changePercent >= 18 ? 'rgba(255, 193, 7, 0.1)' : 'rgba(6, 214, 160, 0.1)'} 100%)`,
                    pointerEvents: 'none',
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>{stock.symbol}</div>
                      <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>{stock.name}</div>
                    </div>
                    <SignalBadge signal={stock.signal} />
                  </div>

                  {/* Price Info */}
                  <div style={{ display: 'flex', gap: '24px', marginBottom: '12px', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>LTP</div>
                      <div style={{ fontSize: '22px', fontWeight: '700' }}>₹{stock.ltp.toFixed(2)}</div>
                    </div>
                    <div
                      style={{
                        padding: '12px 20px',
                        background: stock.changePercent >= 18 ? 'rgba(255, 193, 7, 0.2)' : 'rgba(6, 214, 160, 0.2)',
                        borderRadius: '10px',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '24px',
                          fontWeight: '800',
                          color: stock.changePercent >= 18 ? '#ffc107' : '#06d6a0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <TrendingUp size={24} />
                        +{stock.changePercent.toFixed(2)}%
                      </div>
                      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>
                        +₹{stock.change.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>Volume</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Volume2 size={14} />
                        {stock.volume.toLocaleString()}
                      </div>
                    </div>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>Prev Close</div>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>₹{stock.prevClose.toFixed(2)}</div>
                    </div>
                  </div>

                  {/* Reason/Analysis */}
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      padding: '10px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.8)',
                    }}
                  >
                    <strong>Analysis:</strong> {stock.reason}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Movers;

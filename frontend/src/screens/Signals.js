import React, { useState, useEffect } from 'react';
import { signalsAPI } from '../services/api';
import SignalBadge from '../components/SignalBadge';
import websocketService from '../services/websocket';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const Signals = () => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, buy, sell, wait

  useEffect(() => {
    loadSignals();

    // Listen for real-time signal updates
    websocketService.onSignalUpdate((signal) => {
      setSignals((prev) => {
        const filtered = prev.filter((s) => s.symbol !== signal.symbol);
        return [signal, ...filtered];
      });
    });
  }, []);

  const loadSignals = async () => {
    try {
      setLoading(true);
      const response = await signalsAPI.getSignals();
      if (response.data.success) {
        setSignals(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to load signals');
      console.error('Signals error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSignals = signals.filter((signal) => {
    if (filter === 'all') return true;
    if (filter === 'buy') return signal.signal.includes('BUY');
    if (filter === 'sell') return signal.signal.includes('SELL');
    if (filter === 'wait') return signal.signal === 'WAIT';
    return true;
  });

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div className="spinner"></div>
        <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.6)' }}>Loading signals...</p>
      </div>
    );
  }

  return (
    <div data-testid="signals-screen">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800' }}>Trading Signals</h1>
        <button
          onClick={loadSignals}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '10px',
            padding: '10px',
            cursor: 'pointer',
            color: '#ffffff',
          }}
          data-testid="refresh-signals-button"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
          {[
            { label: 'All Signals', value: 'all' },
            { label: 'Buy', value: 'buy' },
            { label: 'Sell', value: 'sell' },
            { label: 'Wait', value: 'wait' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: 'none',
                background:
                  filter === tab.value
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'rgba(255,255,255,0.05)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
              data-testid={`filter-${tab.value}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Signals List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredSignals.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>No signals available</p>
          </div>
        ) : (
          filteredSignals.map((signal, index) => (
            <div key={index} className="glass-card" data-testid={`signal-card-${signal.symbol}`}>
              {/* Symbol and Signal */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>{signal.symbol}</div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                    {new Date(signal.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <SignalBadge signal={signal.signal} />
              </div>

              {/* Price Info */}
              <div style={{ display: 'flex', gap: '24px', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>LTP</div>
                  <div style={{ fontSize: '18px', fontWeight: '700' }}>₹{signal.ltp.toFixed(2)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>Change</div>
                  <div
                    style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: signal.change >= 0 ? '#06d6a0' : '#ef476f',
                    }}
                  >
                    {signal.change >= 0 ? '+' : ''}
                    {signal.change.toFixed(2)}%
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: '1.5',
                }}
              >
                <strong>Analysis:</strong> {signal.reason}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Signals;

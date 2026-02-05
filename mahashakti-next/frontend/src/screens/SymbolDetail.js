import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marketAPI } from '../services/api';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';

const SymbolDetail = () => {
  const { symbol } = useParams();
  const [symbolData, setSymbolData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSymbolData();
  }, [symbol]);

  const loadSymbolData = async () => {
    try {
      setLoading(true);
      const response = await marketAPI.getSymbolDetail(symbol);
      if (response.data.success) {
        setSymbolData(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to load symbol data');
      console.error('Symbol detail error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!symbolData) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Symbol not found</p>
      </div>
    );
  }

  return (
    <div data-testid="symbol-detail-screen">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <Link to="/" style={{ color: '#ffffff' }}>
          <ArrowLeft size={24} />
        </Link>
        <h1 style={{ fontSize: '28px', fontWeight: '800' }}>{symbolData.symbol}</h1>
      </div>

      {/* Price Card */}
      <div className="glass-card" style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>{symbolData.name}</div>
        <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px' }}>
          ₹{symbolData.ltp.toFixed(2)}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '18px',
            fontWeight: '700',
            color: symbolData.change >= 0 ? '#06d6a0' : '#ef476f',
          }}
        >
          {symbolData.change >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          {symbolData.change >= 0 ? '+' : ''}
          {symbolData.change.toFixed(2)} ({symbolData.changePercent.toFixed(2)}%)
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}>
        <div className="glass-card">
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}>Open</div>
          <div style={{ fontSize: '18px', fontWeight: '700' }}>₹{symbolData.open.toFixed(2)}</div>
        </div>
        <div className="glass-card">
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}>High</div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#06d6a0' }}>₹{symbolData.high.toFixed(2)}</div>
        </div>
        <div className="glass-card">
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}>Low</div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#ef476f' }}>₹{symbolData.low.toFixed(2)}</div>
        </div>
        <div className="glass-card">
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}>Prev Close</div>
          <div style={{ fontSize: '18px', fontWeight: '700' }}>₹{symbolData.prevClose.toFixed(2)}</div>
        </div>
        <div className="glass-card">
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}>Volume</div>
          <div style={{ fontSize: '18px', fontWeight: '700' }}>{symbolData.volume.toLocaleString()}</div>
        </div>
        <div className="glass-card">
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}>Avg Price</div>
          <div style={{ fontSize: '18px', fontWeight: '700' }}>₹{symbolData.avgTradePrice.toFixed(2)}</div>
        </div>
      </div>

      {/* Option Chain Button */}
      {symbolData.hasOptions && (
        <Link to="/options" style={{ textDecoration: 'none' }}>
          <button
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            data-testid="view-option-chain-button"
          >
            View Option Chain
          </button>
        </Link>
      )}
    </div>
  );
};

export default SymbolDetail;
